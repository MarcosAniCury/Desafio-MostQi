//Modules
import { useCallback, useEffect, useState } from 'react';

//Services
import { API } from '../../Services/API';

//Components
import Sidebar from '../../Components/ClientSidebar';
import Loading from '../../Components/Loading';
import ClientCard from '../../Components/ClientCard';

//Styles
import {
    Container,
    ContainerNavBar,
    ContainerPaginationTop,
    ContainerContent,
    ContainerPaginationBottom,
    ButtonResearch,
    InputResearch,
    ButtonSelectPage,
    IconPaginate,
    ItensPaginate
} from './styles';

export default function ClientsDataScreen() {
    //useState
    const [isLoading, setIsLoading] = useState(false);
    const [research, setResearch] = useState();
    const [clients, setClients] = useState([]);
    const [loadingClients, setLoadingClients] = useState(true);
    const [pageIndex, setPageIndex] = useState(1);
    const [showPage, setShowPage] = useState(1);

    //Params show in card
    const paramsShowInCard = [
        'name',
        'rg',
        'dateOfBirth',
        'email'
    ];

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

    useEffect(() => {
        if (loadingClients) {
            callApiGetClientByNameLike(pageIndex);
            setLoadingClients(false);
        }
    }, [loadingClients]);

    const ButtonPaginate = useCallback(({ text, isSelect }) => (
        <ButtonSelectPage isSelect={isSelect} onClick={async () => await callApiGetClientByNameLike(text)}>
            <ItensPaginate>
                {text}
            </ItensPaginate>
        </ButtonSelectPage>
    ), [pageIndex, showPage, research]);

    const Paginate = useCallback(() => (
        <>
            <ButtonSelectPage onClick={async () => await callApiGetClientByNameLike(pageIndex - 1)}>
                <IconPaginate className='fa-sharp fa-solid fa-caret-left' />
            </ButtonSelectPage>
            <ButtonPaginate text={showPage} isSelect={pageIndex === showPage} />
            <ButtonPaginate text={showPage + 1} isSelect={pageIndex === showPage + 1} />
            <ButtonPaginate text={showPage + 2} isSelect={pageIndex === showPage + 2} />
            <ButtonSelectPage onClick={async () => await callApiGetClientByNameLike(pageIndex + 1)}>
                <IconPaginate className='fa-sharp fa-solid fa-caret-right' />
            </ButtonSelectPage>
        </>
    ), [showPage, pageIndex, research]);

    return (
        <Container>
            {isLoading && <Loading />}
            <ContainerNavBar> 
                <InputResearch placeholder={ResearchInputPlaceholderString}
                    value={research}
                    onChange={event => {setResearch(event.target.value)}}
                />
                <ButtonResearch onClick={async () => await callApiGetClientByNameLike(pageIndex)}><i class="fa-solid fa-magnifying-glass"></i></ButtonResearch>
            </ContainerNavBar>
            <Sidebar />
            <ContainerPaginationTop>
                <Paginate />
            </ContainerPaginationTop>
            <ContainerContent> {clients && clients.map((client, key) => <ClientCard key={client.name} client={client} index={key} paramsShow={paramsShowInCard} /> )} </ContainerContent>    
            <ContainerPaginationBottom>
                <Paginate />
            </ContainerPaginationBottom>
        </Container>
    );
}