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
} from './styles';

//Img
import MostQuotationLogo from '../../Assets/MostQuotationIcon.jpeg';
import MostLogo from '../../Assets/MostIcon.jpeg';

export default function ClientsDataScreen() {
    //useState
    const [resarch, setResarch] = useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const ResarchInputPlaceholderString = 'Pesquisar';

    return (
        <Container isSidebarOpen={isSidebarOpen}>
            <ContainerLogo>
                <Logo src={isSidebarOpen ? MostQuotationLogo : MostLogo}
                    isOnlyIcon={isSidebarOpen}
                />
            </ContainerLogo>
            <ContainerNavBar> 
                <Input placeholder={ResarchInputPlaceholderString}
                    value={resarch}
                    onChange={event => {setResarch(event.target.value)}}
                />
                <ButtonResarch><i class="fa-solid fa-magnifying-glass"></i></ButtonResarch>
            </ContainerNavBar>
            <ContainerSidebar>
                <IconSidebarController className="fa-solid fa-bars"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <IconSidebar className="fa-sharp fa-solid fa-house-blank" />
            </ContainerSidebar>
            <ContainerPaginationTop>
                <ButtonSelectPage>
                    <i class="fa-sharp fa-solid fa-caret-left"></i>
                </ButtonSelectPage>
                <ButtonSelectPage>
                    1
                </ButtonSelectPage>
                <ButtonSelectPage>
                    2
                </ButtonSelectPage>
                <ButtonSelectPage>
                    3
                </ButtonSelectPage>
                <ButtonSelectPage>
                    <i class="fa-sharp fa-solid fa-caret-right"></i>
                </ButtonSelectPage>
            </ContainerPaginationTop>
            <ContainerPaginationBottom> Pagination Bottom </ContainerPaginationBottom>
            <ContainerContent> Content </ContainerContent>    
            <ContainerLogout> <IconLogout className="fa-solid fa-right-from-bracket" /> </ContainerLogout>
        </Container>
    );
};