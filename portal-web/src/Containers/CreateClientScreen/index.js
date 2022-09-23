//Modules
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
    SpanInputPhotoDescription,
    ContainerInput,
    InputText,
    InputTitle,
    ContainerInputText,
    Footer,
    ButtonDiv,
    ContainerPerfilImg,
    ImgPerfil,
    ContainerLiveness,
    ButtonFinish,
    ButtonExit,
    Icon,
    ContainerDropzone,
    SpanTitleLiveness,
    SpanErrorLiveness,
    SpanErrorMessage,
    SpanInputPhotoDetail,
    ContainerPerfilEmpty,
    ContainerPerfilEmptyText,
    SpanPerfilEmpty
} from './styles.js';

//Services
import { MostQI } from '../../Services/MostQI';
import { API } from '../../Services/API';

export default function CreateClientScreen() {
    //useState
    const [firstTime, setFirstTime] = useState(true);
    const [showModalLiveness, setShowModalLiveness] = useState(false);
    const [livenessErrorMessage, setLivenessErrorMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [livenessVideo, setLivenessVideo] = useState(undefined);
    const [perfilImg, setPerfilImg] = useState(undefined);
    const [documentFrontImg, setDocumentFrontImg] = useState(undefined);
    const [documentBackImg, setDocumentBackImg] = useState(undefined);
    const [name, setName] = useState("");
    const [RG, setRG] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    //useRef
    const videoRef = useRef(null);

    //Navigate
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchData = async () => {
            if (livenessVideo) {
                const auth = await MostQI.authentication();
                if (auth.success) {
                    const response = await MostQI.livenessDetection(livenessVideo.split(',')[2], auth.data);
                    if (response.success && response.data.scoreLiveness > 0.5) {
                        setPerfilImg(`data:image/jpeg;base64,${response.data.frontalImage}`);
                        setShowModalLiveness(false);
                        setFirstTime(false);
                    } else {
                        setLivenessErrorMessage("Seu video nao foi aprovado na prova de vida ou ele e muito longo, favor tentar novamente");
                    }
                }
            }
            setIsLoading(false);
        };
        fetchData();
    }, [livenessVideo, setLivenessVideo]);

    const handleClickSendLiveness = async () => {
        setLivenessErrorMessage(undefined);
        setShowModalLiveness(undefined);
        setIsLoading(true);
        try {
            getBase64(videoRef.current.blob, setLivenessVideo);
        } catch (ex) {
            setLivenessErrorMessage("E necessario gravar o video para prosseguir");
            setIsLoading(false);
        }
    };

    const InputValidation = () => {
        let hasError = false;
        if (!documentFrontImg) {
            setErrorMessage("A foto frontal do documento e obrigatoria");
            hasError = true;
        }
        if (!documentBackImg) {
            setErrorMessage("A foto do verso do documento e obrigatoria ");
            hasError = true;
        }
        if (name.length == 0) {
            setErrorMessage("O nome e obrigatorio");
            hasError = true;
        }
        if (RG.length == 0) {
            setErrorMessage("O RG e obrigatorio");
            hasError = true;
        } else if (RG.length > 9) {
            setErrorMessage("O RG tem como numero maximo de caracteres 9");
            hasError = true;
        }
        if (dateOfBirth.length == 0) {
            setErrorMessage("A data de nascimento e obrigatorio");
            hasError = true;
        } else if (dateOfBirth.length > 10) {
            setErrorMessage("A data de nascimento tem como numero maximo de caracteres 10");
            hasError = true;
        }
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.length == 0) {
            setErrorMessage("O email e obrigatorio");
            hasError = true;
        } else if (!regex.test(email)) {
            setErrorMessage("O email digitado nao e um email valido");
            hasError = true;
        }
        return !hasError;
    };

    const handleClickSend = async () => {
        setErrorMessage(undefined);
        setIsLoading(true);
        if (InputValidation()) {
            const authFaceCompare = await MostQI.authentication();
            if (authFaceCompare.success) {
                const responseFaceCompare = await MostQI.faceCompare(perfilImg.split(',')[1], documentFrontImg.split(',')[1], authFaceCompare.data);
                if (responseFaceCompare.success && responseFaceCompare.data < 0.5) {
                    const userToken = JSON.parse(localStorage.getItem('token'));
                    const responseCreate = await API.createClient(name, email, RG, dateOfBirth, documentFrontImg.split(',')[1], documentBackImg.split(',')[1], perfilImg.split(',')[1], userToken.access_token);
                    if (responseCreate.success) {
                        alert('Cliente cadastrado com sucesso');
                        navigate('/collaborator');
                    }
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
                    Envie seu video aqui para realizar a prova de vida, durante a gravacao mova sua cabeca para CIMA, BAIXO, ESQUERDA, DIREITA e SORRIA seguindo essa ordem
                </SpanTitleLiveness>
                {livenessErrorMessage && <SpanErrorLiveness>
                    {livenessErrorMessage}
                </SpanErrorLiveness>}
                <VideoRecord videoRef={videoRef} />
                <ButtonFinish onClick={handleClickSendLiveness}>Enviar</ButtonFinish>
            </ContainerLiveness>
        );
    };

    const InputTextComponent = useCallback(({ title, setState, value, bigSize = false}) => {
        return (
            <ContainerInputText>
                <InputTitle>{title}</InputTitle>
                <InputText type="text" onChange={event => setState(event.target.value)} value={value} bigSize={bigSize}/>
            </ContainerInputText>
        );
    }, []);

    return (      
        <Container>
            {(firstTime || showModalLiveness) && <ModalUploadVideoLiveness />}
            {isLoading && <Loading />}
            <ClientSidebar />
            <ContainerSelfie>
                <SpanInputPhotoDescription>Foto de perfil</SpanInputPhotoDescription>
                {perfilImg ?
                    <ContainerPerfilImg onClick={() => setShowModalLiveness(true)}>
                        <ImgPerfil src={perfilImg} />
                    </ContainerPerfilImg> :
                    <ContainerDropzone onClick={() => setShowModalLiveness(true)}>
                        <ContainerPerfilEmpty>
                            <ContainerPerfilEmptyText>
                                <SpanPerfilEmpty>Grave um video que a foto ira ser gerada automaticamente</SpanPerfilEmpty>
                            </ContainerPerfilEmptyText>
                        </ContainerPerfilEmpty>
                    </ContainerDropzone>}              
            </ContainerSelfie>
            <ContainerDocFront>
                <SpanInputPhotoDescription>Foto do documento</SpanInputPhotoDescription>
                <SpanInputPhotoDetail>FRENTE</SpanInputPhotoDetail>
                <ContainerDropzone>
                    <Dropzone text={"Arraste a foto de frente do documento aqui"} onDrop={onDropDocumentFront} imageShow={documentFrontImg} />   
                </ContainerDropzone>
            </ContainerDocFront>
            <ContainerDocBack>
                <SpanInputPhotoDescription>Foto do documento</SpanInputPhotoDescription>
                <SpanInputPhotoDetail>VERSO</SpanInputPhotoDetail>
                <ContainerDropzone>
                    <Dropzone text={"Arraste a foto do verso do documento aqui"} onDrop={onDropDocumentBack} imageShow={documentBackImg} />   
                </ContainerDropzone>
            </ContainerDocBack>
            <ContainerInput gridSpace="first">
                <InputTextComponent title="Nome" setState={setName} value={name} bigSize={true}/>
                <InputTextComponent title="RG" setState={setRG} value={RG} />
            </ContainerInput>
            <ContainerInput gridSpace="second">
                <InputTextComponent title="Email" setState={setEmail} value={email} bigSize={true} />
                <InputTextComponent title="Data de nascimento" setState={setDateOfBirth} value={dateOfBirth} />
            </ContainerInput>
            <Footer>
                {
                    errorMessage &&
                    <SpanErrorMessage>{errorMessage}</SpanErrorMessage>
                }
                <ButtonDiv>
                    <Button onClick={handleClickSend} text="Cadastrar" />
                </ButtonDiv>
            </Footer>
        </Container>
    );
}