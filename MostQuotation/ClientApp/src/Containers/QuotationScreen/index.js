//Modules
import { useState } from 'react';

//Components
import Loading from '../../Components/Loading';

//Styles
import { Container } from './styles';

export default function QuotationScreen() {
    //useState
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Container>
            {isLoading && <Loading />}
        </Container>
    );
}