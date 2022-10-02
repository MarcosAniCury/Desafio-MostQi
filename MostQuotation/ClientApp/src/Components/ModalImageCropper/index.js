//React imports
import React, { useState, useCallback, useRef } from "react";
import ReactCrop from 'react-image-crop';

//Styles
import 'react-image-crop/dist/ReactCrop.css';
import {
    ContainerImageCropper,
    Img,
    ContainerImage,
    ButtonExit,
    ButtonFinish,
    Icon
} from './styles.js'

export default function ModalImageCropper ({ imageBase64, onImageCropped, setShowModal }) {
    const cropRef = useRef(null);
    const [cropConfig, setCropConfig] = useState(
        {
            unit: 'px',
            width: 600,
            height: 600,
            aspect: 16 / 9,
        }
    );

    const onUploadCrop = useCallback(async () => {
        const croppedImageBase64 = await cropImage(
            cropRef.current,
            cropConfig,
        );

        onImageCropped(croppedImageBase64);
        setShowModal(false);
    }, [cropConfig]);

    const cropImage = async (imageElm, crop) => {
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

        return canvas.toDataURL("image/jpg");
    };

    return (
        <ContainerImageCropper>
            <ButtonExit onClick={() => setShowModal(false)}>
                <Icon class="fa-solid fa-xmark" />
            </ButtonExit>
            <ContainerImage>
                <ReactCrop
                    crop={cropConfig}
                    onChange={setCropConfig}
                    onComplete={setCropConfig}
                    locked={true}
                >
                    <Img src={imageBase64} ref={cropRef} />
                </ReactCrop>
            </ContainerImage>
            <ButtonFinish onClick={onUploadCrop}>Enviar</ButtonFinish>
        </ContainerImageCropper>
    );
}