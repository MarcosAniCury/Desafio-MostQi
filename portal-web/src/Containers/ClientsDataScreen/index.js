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
    ButtonResarch,
    ContainerLogo,
    Logo,
    Input
} from './styles';

//Img
import MostQuotationLogo from '../../Assets/MostQuotationIcon.jpeg'

export default function ClientsDataScreen() {
    //useState
    const [resarch, setResarch] = useState();

    const ResarchInputPlaceholderString = 'Pesquisar';

    return (
        <Container>
            <ContainerLogo>
                <Logo src={MostQuotationLogo} />
            </ContainerLogo>
            <ContainerNavBar> 
                <Input placeholderString={ResarchInputPlaceholderString}
                    value={resarch}
                    onChange={event => {setResarch(event.target.value)}}
                />
                <ButtonResarch><i class="fa-solid fa-magnifying-glass"></i></ButtonResarch>
            </ContainerNavBar>
            <ContainerSidebar> SideBar </ContainerSidebar>
            <ContainerPaginationTop> Pagination top </ContainerPaginationTop>
            <ContainerPaginationBottom> Pagination Bottom </ContainerPaginationBottom>
            <ContainerContent> Content </ContainerContent>         
        </Container>
    );
};