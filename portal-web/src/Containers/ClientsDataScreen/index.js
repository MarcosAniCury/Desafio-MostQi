//Imports react
import { useState } from 'react';

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
    ItensPaginate
} from './styles';

//Img
import MostQuotationLogo from '../../Assets/MostQuotationIcon.jpeg';
import MostLogo from '../../Assets/MostIcon.jpeg';

export default function ClientsDataScreen() {
    //useState
    const [resarch, setResarch] = useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const ResarchInputPlaceholderString = 'Pesquisar';

    const Sidebar = () => (
        <ContainerSidebar>
            <IconSidebarController className="fa-solid fa-bars"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <ContainerIconSidebar>
                <IconSidebar className="fa-sharp fa-solid fa-house-blank" />
                {isSidebarOpen &&
                    <IconSidebarDescription>
                        Menu
                    </IconSidebarDescription>
                }
            </ContainerIconSidebar>
            <ContainerIconSidebar>
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
            <ContainerLogout>
                <IconLogout className="fa-solid fa-right-from-bracket" />
                {isSidebarOpen &&
                    < IconLogoutDescription >
                        Logout
                    </IconLogoutDescription>
                }
            </ContainerLogout>
            <ContainerPaginationTop>
                <Paginate />
            </ContainerPaginationTop>
            <ContainerContent> Content </ContainerContent>    
            <ContainerPaginationBottom>
                <Paginate />
            </ContainerPaginationBottom>
        </Container>
    );
};