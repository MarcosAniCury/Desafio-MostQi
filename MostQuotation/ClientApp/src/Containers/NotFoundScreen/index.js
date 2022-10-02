//Imports react
import { useNavigate } from 'react-router-dom';

//Hooks
import { useAuth } from '../../Hooks/auth';

//Styles
import { Container, ContainerMessage, SpanTitle, SpanDescription, Icon } from './styles'

export default function NotFoundScreen() {
    //Navigation
    const navigate = useNavigate();

    //Auth
    const { logout } = useAuth();

    const HandleOnClickContainer = () => {
        logout();
        navigate('/')
    }

    return (
        <Container onClick={HandleOnClickContainer} >
            <ContainerMessage>
                <SpanTitle>
                    4
                    <Icon className="fa-solid fa-ban"/>
                    4
                </SpanTitle>
                <SpanDescription>A página não foi encontrada</SpanDescription>
            </ContainerMessage>
        </Container>
    );
}