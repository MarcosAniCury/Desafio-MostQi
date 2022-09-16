//React imports
import React, { useState, useCallback } from "react";
import ReactCrop from 'react-image-crop';

//Styles
import 'react-image-crop/dist/ReactCrop.css';
import {
    ContainerImageCropper,
    Img,
    ContainerImage,
    ButtonExit
} from './styles.js'

export const ModalImageCropper = ({ imageToCrop, onImageCropped, setShowModal }) => {
    const [cropConfig, setCropConfig] = useState(
        // default crop config
        {
            unit: 'px',
            width: 600,
            height: 800,
            aspect: 16 / 9,
        }
    );

    const onUploadCrop = useCallback(async () => {
            const { blob: croppedBlob, blobUrl, revokeUrl } = await cropImage(
                cropRef.current,
                requestData.items[0].file,
                crop,
                true
            );

            requestData.items[0].file = croppedBlob;

            updateRequest({ items: requestData.items });
            setCroppedUrl({ blobUrl, revokeUrl });
        }
    }, [requestData, updateRequest, crop]);

    const getBlobFromCanvas = (canvas, file, withUrl) =>
        new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    blob.name = file.name;
                    blob.lastModified = file.lastModified;

                    let blobUrl, revokeUrl;

                    if (withUrl) {
                        blobUrl = URL.createObjectURL(blob);
                        revokeUrl = () => URL.revokeObjectURL(blobUrl);
                    }

                    resolve({ blob, blobUrl, revokeUrl });
                } else {
                    reject(new Error("Canvas is empty"));
                }
            }, file.type);
        });

    const cropImage = async (imageElm, file, crop, withUrl = false) => {
        const canvas = document.createElement("canvas"),
            scaleX = imageElm.naturalWidth / imageElm.width,
            scaleY = imageElm.naturalHeight / imageElm.height,
            pixelRatio = window.devicePixelRatio,
            ctx = canvas.getContext("2d");

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            imageElm,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        return await getBlobFromCanvas(canvas, file, withUrl);
    };

    return (
        <ContainerImageCropper>
            <ButtonExit onClick={() => setShowModal(false)}>
                <i class="fa-solid fa-xmark"></i>
            </ButtonExit>
            <ContainerImage>
                <ReactCrop
                    crop={cropConfig}
                    onChange={setCropConfig}
                    onComplete={setCropConfig}
                    locked={true}
                >
                    <Img src={imageToCrop} />
                </ReactCrop>
            </ContainerImage>
            <button onClick={onUploadCrop}>Teste</button>
        </ContainerImageCropper>
    );
}