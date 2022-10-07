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

export default function LoginScreen(token) {
    //Messages
    const signinDefaultString = 'Lembrou sua senha?';
    const signinOverString = 'Faca login agora';
    const emptyInputPasswordString = 'O campo senha deve ter entre 6 e 50 caracteres';
    const notIgualsInputPasswordsString = 'Os campos de senha devem ser iguais';

    //Components name
    const titleString = 'Troque a senha';
    const placeholderPasswordInputString = 'Senha';
    const placeholderPasswordConfirmInputString = 'Confirmacao de senha';
    const buttonSendString = 'Trocar senha'

    //API validations
    const InputPasswordString = 'Password';
    const InputPasswordConfirmString = 'PasswordConfirm';

    //useStates
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [signinAnchor, setSigninAnchor] = useState(signinDefaultString);
    const [errorStylePassword, setErrorStylePassword] = useState(false);
    const [errorStylePasswordConfirm, setErrorStylePasswordConfirm] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState();

    //Auth
    const { recoverPassword } = useAuth();

    //Navigate
    const navigate = useNavigate();

    const InputErrorApiStyleHandle = (key = undefined) => {
        setErrorStylePassword(key == InputPasswordString);
        setErrorStylePasswordConfirm(key == InputPasswordConfirmString);
    };

    const InputErrorStyleHandle = () => {
        let isAllInputFull = true;

        const isPasswordError = password === '' || (password.length < 6 || password.length > 50);
        setErrorStylePassword(isPasswordError);
        if (isPasswordError) {
            setErrorMessage(emptyInputPasswordString)
            isAllInputFull = false;
        }

        const isPasswordConfirmError = passwordConfirm === '' || (passwordConfirm.length < 6 || passwordConfirm.length > 50);
        setErrorStylePasswordConfirm(isPasswordError);
        if (isPasswordConfirmError) {
            setErrorMessage(emptyInputPasswordString)
            isAllInputFull = false;
        }

        const isPasswordsDifferent = password !== passwordConfirm;
        setErrorStylePasswordConfirm(isPasswordsDifferent);
        if (isPasswordsDifferent) {
            setErrorMessage(notIgualsInputPasswordsString);
            isAllInputFull = false;
        }

        return isAllInputFull;
    };

    const HandleButtonSubmitOnClick = async () => {
        setIsLoading(true);
        if (InputErrorStyleHandle()) {
            setErrorMessage(undefined);
            const response = await recoverPassword(password, passwordConfirm, token.token);
            if (response === true) {
                alert('A senha foi redefinida com sucesso, favor logar com a nova senha');
                navigate('/');
            } else {
                setErrorMessage(response);
            }
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Loading />}
            <Form>
                <SpanTitle>{titleString}</SpanTitle>

                <Input isErrorStyle={errorStylePassword}
                    placeholderString={placeholderPasswordInputString}
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    type='password'
                />

                <Input isErrorStyle={errorStylePasswordConfirm}
                    placeholderString={placeholderPasswordConfirmInputString}
                    value={passwordConfirm}
                    onChange={event => setPasswordConfirm(event.target.value)}
                    type='password'
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
