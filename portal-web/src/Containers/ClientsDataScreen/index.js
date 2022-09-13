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
    ButtonResarch
} from './styles';

//Components
import Input from '../../Components/Input';

export default function ClientsDataScreen() {
    //useState
    const [resarch, setResarch] = useState();

    const ResarchInputPlaceholderString = 'Pesquisar';

    return (
        <Container>
            <ContainerNavBar> 
                <Input placeholderString={ResarchInputPlaceholderString}
                    value={resarch}
                    onChange={event => {setResarch(event.target.value)}}
                />
                <ButtonResarch>Teste</ButtonResarch>
            </ContainerNavBar>
            <ContainerSidebar> SideBar </ContainerSidebar>
            <ContainerPaginationTop> Pagination top </ContainerPaginationTop>
            <ContainerPaginationBottom> Pagination Bottom </ContainerPaginationBottom>
            <ContainerContent> Content </ContainerContent>         
        </Container>
    );
};