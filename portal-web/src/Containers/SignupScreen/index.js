//Imports react
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Hooks
import { useAuth } from '../../Hooks/auth';

//Styles
import {
    ContainerBody,
    ContainerLogin,
    Form,
    TextAnchor,
    WarpInput,
    WrapLogin,
    SpanTitle,
    Input,
    ButtonSubmit,
    ContainerButtonSubmit,
    ContainerTextAnchor,
    SpanErrorMessage
} from './styles';

export default function LoginScreen() {
    //Messages
    const createUserDefaultString = 'Voce ja possui uma conta?';
    const createUserOverString = 'Logue agora';
    const emptyInputUsernameString = 'O campo usuario nao pode ser vazio';
    const emptyInputPasswordString = 'O campo senha deve ter entre 6 e 50 caracteres';

    //Components name
    const titleString = 'Cadastrar';
    const placeholderUserInputString = 'Usuario';
    const placeholderPasswordInputString = 'Senha';
    const buttonSendString = 'Entrar'

    //API validations
    const InputNameString = 'Name';
    const InputPasswordString = 'Password';

    //useStates
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [createUserAnchor, setCreateUserAnchor] = useState(createUserDefaultString);
    const [errorStyleUsername, setErrorStyleUsername] = useState(false);
    const [errorStylePassword, setErrorStylePassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    //Auth
    const { user, errorMessage: errorMessageApi, signed, signin } = useAuth();

    //Navigate
    const navigate = useNavigate();

    const InputErrorApiStyleHandle = (key = undefined) => {
        setErrorStyleUsername(key == InputNameString);
        setErrorStylePassword(key == InputPasswordString)
    };

    const InputErrorStyleHandle = () => {
        let isAllInputFull = true;

        const isPasswordError = password === '' || (password < 6 || password > 50);
        setErrorStylePassword(isPasswordError);
        if (isPasswordError) {
            setErrorMessage(emptyInputPasswordString)
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
            await signin(username, password)
        }
    };

    //Every time singin and return erro update states
    useEffect(() => {
        setErrorMessage(errorMessageApi?.message);
        InputErrorApiStyleHandle(errorMessageApi?.key);
    }, [errorMessageApi]);

    //When is signed navigate to type user screen
    useEffect(() => {
        if (signed) {
            navigate(`/${user.type}`);
        }
    }, [signed]);

    return (
        <>
            <ContainerBody>
                <ContainerLogin>
                    <WrapLogin>
                        <Form>
                            <SpanTitle>{titleString}</SpanTitle>

                            <WarpInput error={errorStyleUsername}>
                                <Input placeholder={placeholderUserInputString} type='text' value={username} onChange={event => setUsername(event.target.value)} id='username' />
                            </WarpInput>

                            <WarpInput error={errorStylePassword}>
                                <Input placeholder={placeholderPasswordInputString} type='text' value={password} onChange={event => setPassword(event.target.value)} id='password' />
                            </WarpInput>

                            {errorMessage && <SpanErrorMessage>{errorMessage}</SpanErrorMessage>}

                            <ContainerButtonSubmit>
                                <ButtonSubmit onClick={HandleButtonSubmitOnClick}>{buttonSendString}</ButtonSubmit>
                            </ContainerButtonSubmit>

                            <ContainerTextAnchor>
                                <TextAnchor to='/'
                                    onMouseOver={() => setCreateUserAnchor(createUserOverString)}
                                    onMouseOut={() => setCreateUserAnchor(createUserDefaultString)}>
                                    {createUserAnchor}
                                </TextAnchor>
                            </ContainerTextAnchor>
                        </Form>
                    </WrapLogin>
                </ContainerLogin>
            </ContainerBody>
        </>
    );
}
