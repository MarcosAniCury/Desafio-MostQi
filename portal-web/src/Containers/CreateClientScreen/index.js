//React import
import React, { useState, useCallback, useEffect } from 'react'
import moment from "moment";

//Components
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
    const [livenessVideoBlob, setLivenessVideoBlob] = useState(undefined);
    const [livenessVideo, setLivenessVideo] = useState(undefined);
    const [perfilImg, setPerfilImg] = useState(undefined);
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

    useEffect(() => {
        async function fetchData() {
            await callContentExtractionMostQI(documentFrontImg);
        };
        if (documentFrontImg) {
            fetchData();
        }
    }, [documentFrontImg]);

    const onDropDocumentFront = acceptedFiles => {
        getBase64(acceptedFiles[0], setDocumentFrontImg);
    };

    useEffect(() => {
        async function fetchData() {
            await callContentExtractionMostQI(documentBackImg);
        };
        if (documentBackImg) {
            fetchData();
        }
    }, [documentBackImg]);

    const onDropDocumentBack = acceptedFiles => {
        getBase64(acceptedFiles[0], setDocumentBackImg);
    };

    const handleClickSendLiveness = async () => {
        setIsLoading(true);
        getBase64(livenessVideoBlob, setLivenessVideo);
        if (livenessVideo) {
            const auth = await MostQI.authentication();
            if (auth.success) {
                const imagePerfil = await MostQI.livenessDetection(livenessVideo.split(',')[2], auth.data);
                if (imagePerfil.success) {
                    setPerfilImg(`data:image/jpeg;base64,${imagePerfil.data}`);
                    setShowModalLiveness(false);
                    setFirstTime(false);
                }
            }
        }
        setIsLoading(false);
    };

    const ModalUploadVideoLiveness = () => {
        return (
            <ContainerLiveness>
                {!firstTime &&
                    <ButtonExit onClick={() => setShowModalLiveness(false)}>
                        <Icon className="fa-solid fa-xmark" />
                    </ButtonExit>}
                <SpanTitleLiveness>
                    Aqui envie seu video para realizar a prova de vida, durante a gravacao mova sua cabeca para CIMA, BAIXO, ESQUERDA, DIREITA e SORRIA seguindo essa ordem
                </SpanTitleLiveness>
                <ContainerImage>
                    <VideoRecord setVideoBlob={setLivenessVideoBlob} />
                    {livenessVideoBlob && <video
                        playsInline
                        muted
                        autoPlay
                        src={URL.createObjectURL(livenessVideoBlob)}
                        style={{ width: `70vw` }}
                    />}
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
            <ClientSidebar />
            <ContainerSelfie>
                <SpanIputPhotoDescription>Foto de perfil</SpanIputPhotoDescription>
                {perfilImg &&
                    <ContainerPerfilImg onClick={() => setShowModalLiveness(true)}>
                        <ImgPerfil src={perfilImg} />
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