//React import
import React, { useState, useCallback } from 'react'

//Components
import ModalImageCropper from '../../Components/ModalImageCropper';
import ClientSidebar from '../../Components/ClientSidebar';
import Dropzone from '../../Components/Dropzone';

//Utils
import { getBase64 } from '../../Utils/Utils.js';

//Styles
import {
    Container,
    ContainerImage,
    Img,
    ContainerSelfie,
    ContainerDocFront,
    ContainerDocBack,
    InputImage
} from './styles.js';

export default function CreateClientScreen() {
    //useState
    const [showModalInputImg, setShowModalInputImg] = useState(false);
    const [inputImg64, setInputImg64] = useState();
    const [croppedImage, setCroppedImage] = useState(undefined);

    const onDrop = useCallback(acceptedFiles => {
        getBase64(acceptedFiles[0], setInputImg64);
        setShowModalInputImg(true);
    }, [inputImg64, showModalInputImg])

    return (      
        <Container>
            {showModalInputImg &&
                <ModalImageCropper
                    imageBase64={inputImg64}
                    onImageCropped={setCroppedImage}
                    setShowModal={setShowModalInputImg}
                />}
            <ClientSidebar />
            <ContainerSelfie>
                <Dropzone text={"Arraste a foto de perfil aqui"} onDrop={onDrop}/>              
            </ContainerSelfie>
            <ContainerDocFront></ContainerDocFront>
            <ContainerDocBack></ContainerDocBack>
        </Container>
    );
}