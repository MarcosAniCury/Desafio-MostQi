//Imports react
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Hooks
import { useAuth } from '../../Hooks/auth';

//Services
import { API } from '../../Services/API';

//Styles
import {
    Container,
    ContainerNavBar,
    ContainerSidebar,
    ContainerPaginationTop,
    ContainerContent,
    ContainerPaginationBottom,
    ContainerLogout,
    ButtonResarch,
    ContainerLogo,
    Logo,
    Input,
    IconLogout,
    ButtonSelectPage,
    IconSidebarController,
    IconSidebar,
    ContainerIconSidebar,
    IconSidebarDescription,
    IconLogoutDescription,
    IconPaginate,
    ItensPaginate,
    ContainerCardClient,
    ContainerCardClientImage,
    ContainerCardClientDesription,
    CardClientImg
} from './styles';

//Img
import MostQuotationLogo from '../../Assets/MostQuotationIcon.jpeg';
import MostLogo from '../../Assets/MostIcon.jpeg';

export default function ClientsDataScreen() {
    //useState
    const [resarch, setResarch] = useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [clients, setClients] = useState([]);

    //Auth
    const { logout } = useAuth();

    //Navigate
    const navigate = useNavigate();

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

    const HandleClickLogout = () => {
        logout();
        navigate('/');
    };

    const Sidebar = () => (
        <ContainerSidebar>
            <IconSidebarController className="fa-solid fa-bars"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <ContainerIconSidebar onClick={() => navigate('/collaborator')} >
                <IconSidebar className="fa-sharp fa-solid fa-house-blank" />
                {isSidebarOpen &&
                    <IconSidebarDescription>
                        Menu
                    </IconSidebarDescription>
                }
            </ContainerIconSidebar>
            <ContainerIconSidebar onClick={() => navigate('/collaborator/client/create')}>
                <IconSidebar className="fa-regular fa-address-card" />
                {isSidebarOpen &&
                    <IconSidebarDescription>
                        Cadastro
                    </IconSidebarDescription>
                }
            </ContainerIconSidebar>
            <ContainerIconSidebar>
                <IconSidebar className="fa-solid fa-clock-rotate-left" />
                {isSidebarOpen &&
                    <IconSidebarDescription>
                        Historico
                    </IconSidebarDescription>
                }
            </ContainerIconSidebar>
        </ContainerSidebar>
    );

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
        <Container isSidebarOpen={isSidebarOpen}>
            <ContainerNavBar> 
                <Input placeholder={ResarchInputPlaceholderString}
                    value={resarch}
                    onChange={event => {setResarch(event.target.value)}}
                />
                <ButtonResarch><i class="fa-solid fa-magnifying-glass"></i></ButtonResarch>
            </ContainerNavBar>
            <ContainerLogo>
                <Logo src={isSidebarOpen ? MostQuotationLogo : MostLogo}
                    isOnlyIcon={isSidebarOpen}
                />
            </ContainerLogo>
            <Sidebar />
            <ContainerLogout onClick={HandleClickLogout}>
                <IconLogout className="fa-solid fa-right-from-bracket"/>
                {isSidebarOpen &&
                    < IconLogoutDescription >
                        Logout
                    </IconLogoutDescription>
                }
            </ContainerLogout>
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