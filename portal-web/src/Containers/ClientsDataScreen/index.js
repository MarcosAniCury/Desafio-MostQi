//Imports react
import { useCallback, useEffect, useState } from 'react';
import moment from "moment";

//Services
import { API } from '../../Services/API';

//Components
import Sidebar from '../../Components/ClientSidebar';
import Loading from '../../Components/Loading';

//Styles
import {
    Container,
    ContainerNavBar,
    ContainerPaginationTop,
    ContainerContent,
    ContainerPaginationBottom,
    ButtonResearch,
    Input,
    ButtonSelectPage,
    IconPaginate,
    ItensPaginate,
    ContainerCardClient,
    ContainerCardClientImage,
    ContainerCardClientDesription,
    CardClientImg,
    CardClient,
    SpanTitleCard,
    SpanDescriptionCard,
    Column
} from './styles';

export default function ClientsDataScreen() {
    //useState
    const [isLoading, setIsLoading] = useState(false);
    const [research, setResearch] = useState();
    const [clients, setClients] = useState([]);
    const [loadingClients, setLoadingClients] = useState(true);
    const [pageIndex, setPageIndex] = useState(1);
    const [showPage, setShowPage] = useState(1);

    //Strings
    const ResearchInputPlaceholderString = 'Pesquisar';

    const callApiGetClientByNameLike = async page => {
        setIsLoading(true);
        const userToken = JSON.parse(localStorage.getItem('token'));
        const response = await API.getClientByNameLike(research, page, userToken.access_token);
        if (response.success) {
            setPageIndex(page);
            setClients(response.data);
            if (showPage + 2 < page || page < showPage) {
                setShowPage(page);
            }
        }
        setIsLoading(false);
    };

    const callApiGetAllClients = async page => {
        setIsLoading(true);
        const userToken = JSON.parse(localStorage.getItem('token'));
        const response = await API.getAllClients(page, userToken.access_token);
        if (response.success) {
            setPageIndex(page);
            setClients(response.data);
            if (showPage + 2 < page || page < showPage) {
                setShowPage(page);
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (loadingClients) {
            callApiGetAllClients(pageIndex);
            setLoadingClients(false);
        }
    }, [loadingClients]);

    const handleClickResearch = async () => {
        if (!research || research == '') {
            await callApiGetAllClients(pageIndex);
        } else {
            await callApiGetClientByNameLike(pageIndex);
        }
    };

    const HandleClickArrowForward = async () => {
        if (!research || research == '') {
            await callApiGetAllClients(pageIndex + 1);
        } else {
            await callApiGetClientByNameLike(pageIndex + 1);
        }
    };

    const HandleClickArrowBackward = async () => {
        if (!research || research == '') {
            await callApiGetAllClients(pageIndex - 1);
        } else {
            await callApiGetClientByNameLike(pageIndex - 1);
        }
    }

    const HandleClickPaginate = async page => {
        console.log(research);
        if (!research || research == '') {
            await callApiGetAllClients(page);
        } else {
            await callApiGetClientByNameLike(page);
        }
    };

    const ButtonPaginate = useCallback(({ text, isSelect }) => (
        <ButtonSelectPage isSelect={isSelect} onClick={() => HandleClickPaginate(text)}>
            <ItensPaginate>
                {text}
            </ItensPaginate>
        </ButtonSelectPage>
    ), [pageIndex, showPage, research]);

    const Paginate = useCallback(() => (
        <>
            <ButtonSelectPage onClick={HandleClickArrowBackward}>
                <IconPaginate className='fa-sharp fa-solid fa-caret-left' />
            </ButtonSelectPage>
            <ButtonPaginate text={showPage} isSelect={pageIndex === showPage} />
            <ButtonPaginate text={showPage + 1} isSelect={pageIndex === showPage + 1} />
            <ButtonPaginate text={showPage + 2} isSelect={pageIndex === showPage + 2} />
            <ButtonSelectPage onClick={HandleClickArrowForward}>
                <IconPaginate className='fa-sharp fa-solid fa-caret-right' />
            </ButtonSelectPage>
        </>
    ), [showPage, pageIndex, research]);

    const CardClientItems = ({ title, description, isFirst }) => (
        <ContainerCardClientDesription isFirst={isFirst}>
            <SpanTitleCard>{title}</SpanTitleCard>
            <SpanDescriptionCard>{description}</SpanDescriptionCard>
        </ContainerCardClientDesription>
    );

    const ClientCard = ({ client, index }) => (
        <ContainerCardClient cardI={index}>
            <CardClient>
                <ContainerCardClientImage>
                    <CardClientImg src={`data:image/jpeg;base64,${client.selfie}`} />
                </ContainerCardClientImage>
                <Column>
                    <CardClientItems title="Nome:" description={client.name} isFirst={true}/>
                    <CardClientItems title="RG:" description={client.rg} />
                    <CardClientItems title="Data de Nascimento:" description={moment(client.dateOfBirth).format('DD/MM/YYYY')} />
                    <CardClientItems title="Email:" description={client.email} />
                </Column>
            </CardClient>
        </ContainerCardClient>
    );

    return (
        <Container>
            {isLoading && <Loading />}
            <ContainerNavBar> 
                <Input placeholder={ResearchInputPlaceholderString}
                    value={research}
                    onChange={event => {setResearch(event.target.value)}}
                />
                <ButtonResearch onClick={handleClickResearch}><i class="fa-solid fa-magnifying-glass"></i></ButtonResearch>
            </ContainerNavBar>
            <Sidebar />
            <ContainerPaginationTop>
                <Paginate />
            </ContainerPaginationTop>
            <ContainerContent> {clients && clients.map((client, key) => <ClientCard key={client.name} client={client} index={key} /> )} </ContainerContent>    
            <ContainerPaginationBottom>
                <Paginate />
            </ContainerPaginationBottom>
        </Container>
    );
}