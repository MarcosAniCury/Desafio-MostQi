//Imports react
import { useNavigate } from 'react-router-dom';

//Styles
import { Container, ContainerMessage, SpanTitle, SpanDescription, Icon } from './styles'

export default function NotFoundScreen() {
    const navigate = useNavigate();

    return (
        <Container onClick={() => {navigate('/')}}>
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