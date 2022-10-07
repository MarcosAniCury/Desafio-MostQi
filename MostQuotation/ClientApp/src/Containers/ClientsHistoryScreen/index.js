//Modules
import { useCallback, useEffect, useState } from 'react';

//Services
import { API } from '../../Services/API';

//Components
import Sidebar from '../../Components/Sidebar';
import Loading from '../../Components/Loading';
import ClientCard from '../../Components/ClientCard';
import Button from '../../Components/Button';

//Styles
import {
    Container,
    ContainerFilter,
    ContainerPaginationTop,
    ContainerContent,
    ContainerPaginationBottom,
    ButtonSelectPage,
    IconPaginate,
    ItensPaginate,
    ContainerNavbar,
    NavbarTitle,
    InputFilter,
    WarpFilter,
    WarpButton,
    ContainerTitle,
    SpanTitle
} from './styles';

export default function ClientsHistoryScreen() {
    //useState
    const [isLoading, setIsLoading] = useState(false);
    const [nameClient, setNameClient] = useState(undefined);
    const [nameCollaborator, setNameCollaborator] = useState(undefined);
    const [clients, setClients] = useState([]);
    const [loadingClients, setLoadingClients] = useState(true);
    const [pageIndex, setPageIndex] = useState(1);
    const [showPage, setShowPage] = useState(1);

    //Params show in card
    const paramsShowInCard = [
        'name',
        'rg',
        'createdAt',
        'collaborator'
    ];

    const callApiGetClientByNameLikeAndCollaboratorLike = async page => {
        setIsLoading(true);
        const userToken = JSON.parse(localStorage.getItem('token'));
        const response = await API.getClientByNameLikeAndCollaboratorLike(nameClient, nameCollaborator, page, userToken.access_token);
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
            callApiGetClientByNameLikeAndCollaboratorLike(pageIndex);
            setLoadingClients(false);
        }
    }, [loadingClients]);

    const Filter = useCallback(() => (
        <ContainerTitle>
            <SpanTitle>Filtro:</SpanTitle>
            <InputFilterItem title="Nome" value={nameClient} setState={setNameClient} />
            <InputFilterItem title="Colaborador" value={nameCollaborator} setState={setNameCollaborator} />
            <WarpButton onClick={async () => await callApiGetClientByNameLikeAndCollaboratorLike(pageIndex)}>
                <Button text="Filtrar" style={{ backgroundColor: '#FFFFFF', color: 'black', paddingBottom: '0' }} />
            </WarpButton>
        </ContainerTitle>  
    ), []);

    const ButtonPaginate = useCallback(({ text, isSelect }) => (
        <ButtonSelectPage isSelect={isSelect} onClick={async () => await callApiGetClientByNameLikeAndCollaboratorLike(text)}>
            <ItensPaginate>
                {text}
            </ItensPaginate>
        </ButtonSelectPage>
    ), [pageIndex, showPage, nameClient]);

    const Paginate = useCallback(() => (
        <>
            <ButtonSelectPage onClick={async () => await callApiGetClientByNameLikeAndCollaboratorLike(pageIndex - 1)}>
                <IconPaginate className='fa-sharp fa-solid fa-caret-left' />
            </ButtonSelectPage>
            <ButtonPaginate text={showPage} isSelect={pageIndex === showPage} />
            <ButtonPaginate text={showPage + 1} isSelect={pageIndex === showPage + 1} />
            <ButtonPaginate text={showPage + 2} isSelect={pageIndex === showPage + 2} />
            <ButtonSelectPage onClick={async () => await callApiGetClientByNameLikeAndCollaboratorLike(pageIndex + 1)}>
                <IconPaginate className='fa-sharp fa-solid fa-caret-right' />
            </ButtonSelectPage>
        </>
    ), [showPage, pageIndex, nameClient]);

    const InputFilterItem = useCallback(({ title, value, setState }) => (
        <WarpFilter>
            <InputFilter value={value} onChange={event => setState(event.target.value)} placeholder={title} />
        </WarpFilter>    
    ), [])

    return (
        <Container>
            <ContainerNavbar><NavbarTitle>Historico de Cliente</NavbarTitle></ContainerNavbar>
            {isLoading && <Loading />}
            <ContainerFilter>
                <Filter />
            </ContainerFilter>
            <Sidebar />
            <ContainerPaginationTop>
                <Paginate />
            </ContainerPaginationTop>
            <ContainerContent> {clients && clients.map((client, key) => <ClientCard key={client.name} client={client} index={key} paramsShow={paramsShowInCard}/>)} </ContainerContent>
            <ContainerPaginationBottom>
                <Paginate />
            </ContainerPaginationBottom>
        </Container>
    );
}