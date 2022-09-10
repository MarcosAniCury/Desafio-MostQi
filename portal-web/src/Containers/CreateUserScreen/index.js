import React, { useCallback, useState } from 'react';
import { API } from '../../Services/API';
import { ContainerBody, ContainerLogin, Form, GlobalStyle, TextAnchor, WarpInput, WrapLogin, SpanTitle, Input, WrapImg, ButtonSubmit, ContainerButtonSubmit, SpanFocusInput, ContainerTextAnchor } from './styles';

export default function CreateUserScreen() {
    const loginDefaultString = 'Já possui conta?';
    const loginOverString = 'Logue agora';
    const titleString = 'Cadastrar';
    const placeholderUserInputString = 'Usuario';
    const placeholderPasswordInputString = 'Senha';
    const buttonSendString = 'Entrar'

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginAnchor, setLoginAnchor] = useState(loginDefaultString);

    const HandleButtonSubmitOnClick = useCallback(async () => {
        if (username !== '' && password !== '') {
            const response = await API.login(username, password);
        }
    }, [username, password, API.login]);

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

                            <ContainerButtonSubmit>
                                <ButtonSubmit onClick={HandleButtonSubmitOnClick}>{buttonSendString}</ButtonSubmit>
                            </ContainerButtonSubmit>

                            <ContainerTextAnchor>
                                <TextAnchor href="https://localhost:7139/swagger/index.html"
                                    onMouseOver={() => setLoginAnchor(loginDefaultString)}
                                    onMouseOut={() => setLoginAnchor(loginOverString)}>
                                    {loginAnchor}
                                </TextAnchor>
                            </ContainerTextAnchor>
                        </Form>
                    </WrapLogin>
                </ContainerLogin>
            </ContainerBody>
        </>
    );
}
