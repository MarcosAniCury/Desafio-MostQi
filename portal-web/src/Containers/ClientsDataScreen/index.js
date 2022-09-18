//Imports react
import { useEffect, useState } from 'react';

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
    ButtonResarch,
    Input,
    ButtonSelectPage,
    IconPaginate,
    ItensPaginate,
    ContainerCardClient,
    ContainerCardClientImage,
    ContainerCardClientDesription,
    CardClientImg
} from './styles';

export default function ClientsDataScreen() {
    //useState
    const [resarch, setResarch] = useState();
    const [clients, setClients] = useState([]);

    //Strings
    const ResarchInputPlaceholderString = 'Pesquisar';

    useEffect(() => {
        const fenchData = async () => {
            const userToken = JSON.parse(localStorage.getItem('token'));
            const response = await API.getAllClients(userToken.access_token);
            setClients(response.data);
        };
        fenchData();
    }, []);

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

    const ClientCard = ({ client }) => (
        <ContainerCardClient cardI={1}>
            <ContainerCardClientImage>
                <CardClientImg src={`data:image/jpeg;base64,${client.selfie}`} />
            </ContainerCardClientImage>
            <ContainerCardClientDesription>
                {client.name}
            </ContainerCardClientDesription>
        </ContainerCardClient>    
    );

    return (
        <Container>
            <ContainerNavBar> 
                <Input placeholder={ResarchInputPlaceholderString}
                    value={resarch}
                    onChange={event => {setResarch(event.target.value)}}
                />
                <ButtonResarch><i class="fa-solid fa-magnifying-glass"></i></ButtonResarch>
            </ContainerNavBar>
            <Sidebar />
            <ContainerPaginationTop>
                <Paginate />
            </ContainerPaginationTop>
            <ContainerContent> {clients && clients.map(client => <ClientCard client={client}/>)} </ContainerContent>    
            <ContainerPaginationBottom>
                <Paginate />
            </ContainerPaginationBottom>
        </Container>
    );
};