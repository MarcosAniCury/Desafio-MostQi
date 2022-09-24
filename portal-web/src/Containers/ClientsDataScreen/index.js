//Imports react
import { useEffect, useState } from 'react';
import moment from "moment";

//Services
import { API } from '../../Services/API';

//Components
import Sidebar from '../../Components/ClientSidebar';

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
    const [research, setResearch] = useState();
    const [clients, setClients] = useState([]);
    const [loadingClients, setLoadingClients] = useState(true);

    //Strings
    const ResearchInputPlaceholderString = 'Pesquisar';

    useEffect(() => {
        const fenchData = async () => {
            const userToken = JSON.parse(localStorage.getItem('token'));
            const response = await API.getAllClients(userToken.access_token);
            setClients(response.data);
        };
        if (loadingClients) {
            fenchData();
            setLoadingClients(false);
        }
    }, [loadingClients]);

    const ButtonPaginate = ({ text, isSelect = false }) => (
        <ButtonSelectPage isSelect={isSelect}>
            <ItensPaginate>
                {text}
            </ItensPaginate>
        </ButtonSelectPage>
    );

    const Paginate = () => (
        <>
            <ButtonSelectPage>
                <IconPaginate className='fa-sharp fa-solid fa-caret-left' />
            </ButtonSelectPage>
            <ButtonPaginate text='1' />
            <ButtonPaginate text='2' isSelect={true}/>
            <ButtonPaginate text='3' />
            <ButtonSelectPage>
                <IconPaginate className='fa-sharp fa-solid fa-caret-right' />
            </ButtonSelectPage>
        </>
    );

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
            <ContainerNavBar> 
                <Input placeholder={ResearchInputPlaceholderString}
                    value={research}
                    onChange={event => {setResearch(event.target.value)}}
                />
                <ButtonResearch><i class="fa-solid fa-magnifying-glass"></i></ButtonResearch>
            </ContainerNavBar>
            <Sidebar />
            <ContainerPaginationTop>
                <Paginate />
            </ContainerPaginationTop>
            <ContainerContent> { clients && clients.map((client, key) => <ClientCard client={client} index={key} /> )} </ContainerContent>    
            <ContainerPaginationBottom>
                <Paginate />
            </ContainerPaginationBottom>
        </Container>
    );
};