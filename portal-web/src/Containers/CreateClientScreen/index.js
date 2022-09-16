//React import
import React, { useState } from 'react'

//Components
import { ModalImageCropper } from '../../Components/ModalImageCropper';

//Utils
import { getBase64 } from '../../Utils/Utils.js';

export default function CreateClientScreen() {
    const [showModalInputImg, setShowModalInputImg] = useState(false);
    const [inputImg, setInputImg] = useState();
    const [croppedImage, setCroppedImage] = useState(undefined);

    const HandleIputDocumentOnChange = event => {
        getBase64(event.target.files[0], setInputImg)
        setShowModalInputImg(true);
    };

    return (      
        <div style={{ backgroundColor: 'red' }}>
            {showModalInputImg &&
                <ModalImageCropper
                    imageToCrop={inputImg}
                    onImageCropped={setCroppedImage}
                    setShowModal={setShowModalInputImg}
                />}
            <input
                type='file'
                accept='image/*'
                onChange={HandleIputDocumentOnChange}
            />            
        </div>
    );
}