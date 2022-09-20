//React import
import React, { useState, useCallback } from 'react'
import moment from "moment";

//Components
import ModalImageCropper from '../../Components/ModalImageCropper';
import ClientSidebar from '../../Components/ClientSidebar';
import Dropzone from '../../Components/Dropzone';
import Button from '../../Components/Button';
import Loading from '../../Components/Loading';
import VideoRecord from '../../Components/VideoRecord';

//Utils
import { getBase64 } from '../../Utils/Utils.js';

//Styles
import {
    Container,
    ContainerSelfie,
    ContainerDocFront,
    ContainerDocBack,
    SpanIputPhotoDescription,
    ContainerInput,
    InputText,
    InputTitle,
    ContainerInputText,
    Footer,
    ButtonDiv,
    ContainerPerfilImg,
    ImgPerfil,
    ContainerLiveness,
    ContainerImage,
    ButtonFinish,
    ButtonExit,
    Icon,
    ContainerDropzone,
    SpanTitleLiveness
} from './styles.js';

//Services
import { MostQI } from '../../Services/MostQI';

export default function CreateClientScreen() {
    //useState
    const [firstTime, setFirstTime] = useState(true);
    const [showModalLiveness, setShowModalLiveness] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModalInputImg, setShowModalInputImg] = useState(false);
    const [livenessVideo, setLivenessVideo] = useState(undefined);
    const [perfilImg, sePerfilImg] = useState(undefined);
    const [perfilCroppedImg, setPerfilCroppedImg] = useState(undefined);
    const [documentFrontImg, setDocumentFrontImg] = useState(undefined);
    const [documentBackImg, setDocumentBackImg] = useState(undefined);
    const [name, setName] = useState();
    const [RG, setRG] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [email, setEmail] = useState();

    const setInputWithContentExtraction = contentExtraction => {
        contentExtraction.forEach(content => {
            switch (content.name) { 
                case "nome": setName(content.value);
                    break;
                case "data_nascimento": setDateOfBirth(moment(content.value).format("D/MM/YYYY"))
                    break;
                case "rg": setRG(content.value);
                    break;
            }   
        });
    };

    const callContentExtractionMostQI = async file => {
        setIsLoading(true);
        const auth = await MostQI.authentication();
        if (auth.success) {
            const contentExtraction = await MostQI.contentExtraction(file.split(',')[1], auth.data);
            if (contentExtraction.success) {
                setInputWithContentExtraction(contentExtraction.data);
            }
        }
        setIsLoading(false);
    };

    const onDropLivenessVideo = useCallback(async (acceptedFiles, fileRejection) => {
        if (fileRejection.length > 0) {
            alert("O arquivo deve ser de no maximo 2MB");
        } else if (acceptedFiles > 0) {
            getBase64(acceptedFiles[0], setLivenessVideo);
        }
    }, [livenessVideo, setLivenessVideo]);

    const onDropDocumentFront = useCallback(async acceptedFiles => {
        getBase64(acceptedFiles[0], setDocumentFrontImg);
        await callContentExtractionMostQI(documentFrontImg);
    }, [documentFrontImg, setDocumentFrontImg]);

    const onDropDocumentBack = useCallback(async acceptedFiles => {
        getBase64(acceptedFiles[0], setDocumentBackImg);
        await callContentExtractionMostQI(documentBackImg);
    }, [documentBackImg, setDocumentBackImg]);

    const handleClickSendLiveness = () => {
        setIsLoading(true);
        if (livenessVideo) {

            setShowModalInputImg(true);
        }
        setIsLoading(false);
    };

    const ModalUploadVideoLiveness = () => {
        return (
            <ContainerLiveness>
                {!firstTime &&
                    <ButtonExit onClick={() => setShowModalLiveness(false)}>
                        <Icon class="fa-solid fa-xmark" />
                    </ButtonExit>}
                <SpanTitleLiveness>
                    Aqui envie seu video para realizar a prova de vida, durante a gravacao mova sua cabeca para CIMA, BAIXO, ESQUERDA, DIREITA e SORRIA seguindo essa ordem
                </SpanTitleLiveness>
                <ContainerImage>
                    <VideoRecord />
                </ContainerImage>
                <ButtonFinish onClick={handleClickSendLiveness}>Enviar</ButtonFinish>
            </ContainerLiveness>
        );
    };

    const InputTextComponent = useCallback(({ title, setState, value }) => {
        return (
            <ContainerInputText>
                <InputTitle>{title}</InputTitle>
                <InputText type="text" onChange={event => setState(event.target.value)} value={value}/>
            </ContainerInputText>
        );
    }, []);

    return (      
        <Container>
            {(firstTime || showModalLiveness) && <ModalUploadVideoLiveness />}
            {isLoading && <Loading />}
            {showModalInputImg &&
                <ModalImageCropper
                    imageBase64={perfilImg}
                    onImageCropped={setPerfilCroppedImg}
                    setShowModal={setShowModalInputImg}
                />}
            <ClientSidebar />
            <ContainerSelfie>
                <SpanIputPhotoDescription>Foto de perfil</SpanIputPhotoDescription>
                {perfilCroppedImg &&
                    <ContainerPerfilImg>
                        <ImgPerfil src={perfilCroppedImg} />
                    </ContainerPerfilImg>}              
            </ContainerSelfie>
            <ContainerDocFront>
                <SpanIputPhotoDescription>Foto do documento frente</SpanIputPhotoDescription>
                <ContainerDropzone>
                    <Dropzone text={"Arraste a foto de frente do documento aqui"} onDrop={onDropDocumentFront} imageShow={documentFrontImg} />   
                </ContainerDropzone>
            </ContainerDocFront>
            <ContainerDocBack>
                <SpanIputPhotoDescription>Foto do documento verso</SpanIputPhotoDescription>
                <ContainerDropzone>
                    <Dropzone text={"Arraste a foto do verso do documento aqui"} onDrop={onDropDocumentBack} imageShow={documentBackImg} />   
                </ContainerDropzone>
            </ContainerDocBack>
            <ContainerInput gridSpace="first">
                <InputTextComponent title="Nome" setState={setName} value={name} />
                <InputTextComponent title="RG" setState={setRG} value={RG} />
                <InputTextComponent title="Data de nascimento" setState={setDateOfBirth} value={dateOfBirth}/>
            </ContainerInput>
            <ContainerInput gridSpace="second">
                <InputTextComponent title="Email" setState={setEmail} value={email}/>
            </ContainerInput>
            <Footer>
                <ButtonDiv>
                    <Button text="Cadastrar" />
                </ButtonDiv>
            </Footer>
        </Container>
    );
}