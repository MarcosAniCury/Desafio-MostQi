//Imports react
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Hooks
import { useAuth } from '../../Hooks/auth';

//Styles
import {
    TextAnchor,
    SpanTitle,
    ContainerTextAnchor,
    SpanErrorMessage,
} from './styles';

//Components
import Form from '../../Components/Form';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Loading from '../../Components/Loading';

export default function LoginScreen() {
    //Messages
    const signinDefaultString = 'Lembrou sua senha?';
    const signinOverString = 'Faca login agora';
    const emptyInputUsernameString = 'O campo usuario nao pode ser vazio';
    const notEmailValidationInputEmailString = 'O campo email nao e um email valido';

    //Components name
    const titleString = 'Esqueceu a senha?';
    const placeholderUserInputString = 'Usuario';
    const placeholderEmailInputString = 'Email';
    const buttonSendString = 'Restaurar'

    //API validations
    const InputNameString = 'Name';
    const InputEmailString = 'Email';

    //useStates
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [signinAnchor, setSigninAnchor] = useState(signinDefaultString);
    const [errorStyleUsername, setErrorStyleUsername] = useState(false);
    const [errorStyleEmail, setErrorStyleEmail] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState();

    //Auth
    const { errorMessage: errorMessageApi, forgetPassword, setErrorMessage: setErrorMessageAPI } = useAuth();

    //Navigate
    const navigate = useNavigate();

    const InputErrorApiStyleHandle = (key = undefined) => {
        setErrorStyleUsername(key == InputNameString);
        setErrorStyleEmail(key == InputEmailString);
    };

    const InputErrorStyleHandle = () => {
        let isAllInputFull = true;

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isEmailError = !regex.test(email);
        setErrorStyleEmail(isEmailError);
        if (isEmailError) {
            setErrorMessage(notEmailValidationInputEmailString);
            isAllInputFull = false;
        }

        const isUsernameError = username === '';
        setErrorStyleUsername(isUsernameError);
        if (isUsernameError) {
            setErrorMessage(emptyInputUsernameString);
            isAllInputFull = false;
        }
        return isAllInputFull;
    };

    const HandleButtonSubmitOnClick = async () => {
        if (InputErrorStyleHandle()) {
            setIsLoading(true);
            if (await forgetPassword(username, email)) {
                setIsLoading(false);
                alert('O email de recuperacao de senha foi enviado com sucesso');
                navigate('/');
            }
        }
    };

    useEffect(() => {
        setErrorMessageAPI(false);
    }, []);

    //Every time singup and return erro update states
    useEffect(() => {
        setErrorMessage(errorMessageApi?.message);
        InputErrorApiStyleHandle(errorMessageApi?.key);
    }, [errorMessageApi]);

    return (
        <>
            {isLoading && <Loading />}
            <Form>
                <SpanTitle>{titleString}</SpanTitle>

                <Input isErrorStyle={errorStyleUsername}
                    placeholderString={placeholderUserInputString}
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />

                <Input isErrorStyle={errorStyleEmail}
                    placeholderString={placeholderEmailInputString}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    type='email'
                />

                {errorMessage && <SpanErrorMessage>{errorMessage}</SpanErrorMessage>}

                <Button onClick={HandleButtonSubmitOnClick}
                    text={buttonSendString}
                />

                <ContainerTextAnchor>
                    <TextAnchor to='/'
                        onMouseOver={() => setSigninAnchor(signinOverString)}
                        onMouseOut={() => setSigninAnchor(signinDefaultString)}>
                        {signinAnchor}
                    </TextAnchor>
                </ContainerTextAnchor>
            </Form>
        </>
    );
}
