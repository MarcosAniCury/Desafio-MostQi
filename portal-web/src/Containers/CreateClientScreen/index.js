//React import
import React, { useState } from 'react'

//Components
import { ModalImageCropper } from '../../Components/ModalImageCropper';

//Utils
import { getBase64 } from '../../Utils/Utils.js';

//Styles

import {
    ContainerImage,
    Img
} from './styles.js';

export default function CreateClientScreen() {
    const [showModalInputImg, setShowModalInputImg] = useState(false);
    const [inputImg64, setInputImg64] = useState();
    const [inputImgFile, setInputImgFile] = useState();
    const [croppedImage, setCroppedImage] = useState(undefined);

    const HandleIputDocumentOnChange = event => {
        setInputImgFile(event.target.files[0]);
        getBase64(event.target.files[0], setInputImg64);
        setShowModalInputImg(true);
    };

    return (      
        <div style={{ backgroundColor: 'red' }}>
            {showModalInputImg &&
                <ModalImageCropper
                    imageToCrop={inputImgFile}
                    imageBase64={inputImg64}
                    onImageCropped={setCroppedImage}
                    setShowModal={setShowModalInputImg}
                />}
            <input
                type='file'
                accept='image/*'
                onChange={HandleIputDocumentOnChange}
            />
            {
                croppedImage &&
                <ContainerImage>
                    <Img src={croppedImage} />
                </ContainerImage>
            }
        </div>
    );
}