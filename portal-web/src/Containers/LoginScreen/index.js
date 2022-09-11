import React, { useCallback, useState } from 'react';
import { API } from '../../Services/API';
import { ContainerBody, ContainerLogin, Form, GlobalStyle, TextAnchor, WarpInput, WrapLogin, SpanTitle, Input, WrapImg, ButtonSubmit, ContainerButtonSubmit, SpanFocusInput, ContainerTextAnchor, SpanErrorMessage } from './styles';

export default function LoginScreen() {
    const createUserDefaultString = 'Voce nao possui uma conta?';
    const createUserOverString = 'Crie sua conta agora';
    const forgetPasswordDefaultString = 'Esqueceu sua senha?';
    const forgetPasswordOverString = 'Recupere agora';
    const titleString = 'Login';
    const placeholderUserInputString = 'Usuario';
    const placeholderPasswordInputString = 'Senha';
    const buttonSendString = 'Entrar'

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [createUserAnchor, setCreateUserAnchor] = useState(createUserDefaultString);
    const [forgetPasswordAnchor, setForgetPasswordAnchor] = useState(forgetPasswordDefaultString);
    const [errorMessage, setErrorMessage] = useState(null);

    const HandleButtonSubmitOnClick = useCallback(async () => {
        if (username !== '' && password !== '') {
            const response = await API.login(username, password);
            if (response.success == false) {
                const [key] = Object.keys(response.errors);
                setErrorMessage(response.errors[key][0]);
            } else {
                setErrorMessage(null);
            }
        }
    }, [username, password, errorMessage, API.login]);

    return (
        <>
            <GlobalStyle />
            <ContainerBody>
                <ContainerLogin>
                    <WrapLogin>
                        <Form>
                            <SpanTitle>{titleString}</SpanTitle>

                            <WarpInput>
                                <Input placeholder={placeholderUserInputString} type='text' value={username} onChange={event => setUsername(event.target.value)} id='username' />
                            </WarpInput>

                            <WarpInput>
                                <Input placeholder={placeholderPasswordInputString} type='text' value={password} onChange={event => setPassword(event.target.value)} id='password' />
                            </WarpInput>

                            {errorMessage != null && < SpanErrorMessage>{errorMessage}</SpanErrorMessage>}

                            <ContainerButtonSubmit>
                                <ButtonSubmit onClick={HandleButtonSubmitOnClick}>{buttonSendString}</ButtonSubmit>
                            </ContainerButtonSubmit>

                            <ContainerTextAnchor>
                                <TextAnchor href="https://localhost:7139/swagger/index.html"
                                    onMouseOver={() => setCreateUserAnchor(createUserOverString)}
                                    onMouseOut={() => setCreateUserAnchor(createUserDefaultString)}>
                                    {createUserAnchor}
                                </TextAnchor>
                                <TextAnchor href="https://localhost:7139/swagger/index.html"
                                    onMouseOver={() => setForgetPasswordAnchor(forgetPasswordOverString)}
                                    onMouseOut={() => setForgetPasswordAnchor(forgetPasswordDefaultString)}>
                                    {forgetPasswordAnchor}
                                </TextAnchor>
                            </ContainerTextAnchor>
                        </Form>
                    </WrapLogin>
                </ContainerLogin>
            </ContainerBody>
        </>
    );
}
