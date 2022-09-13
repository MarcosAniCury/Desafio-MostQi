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
    SpanErrorMessage
} from './styles';

//Components
import Form from '../../Components/Form';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

export default function LoginScreen() {
    //Messages
    const createUserDefaultString = 'Voce nao possui uma conta?';
    const createUserOverString = 'Crie sua conta agora';
    const forgetPasswordDefaultString = 'Esqueceu sua senha?';
    const forgetPasswordOverString = 'Recupere agora';
    const emptyInputUsernameString = 'O campo usuario nao pode ser vazio';
    const emptyInputPasswordString = 'O campo senha deve ter entre 6 e 50 caracteres';

    //Components name
    const titleString = 'Login';
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
    const [forgetPasswordAnchor, setForgetPasswordAnchor] = useState(forgetPasswordDefaultString);
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

        const isPasswordError = password === '' || (password.length < 6 || password.length > 50);
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
            await signin(username, password);
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
        <Form>
            <SpanTitle>{titleString}</SpanTitle>

            <Input isErrorStyle={errorStyleUsername}
                placeholderString={placeholderUserInputString}
                value={username}
                onChange={event => setUsername(event.target.value)}
            />

            <Input isErrorStyle={errorStylePassword}
                placeholderString={placeholderPasswordInputString}
                value={password}
                onChange={event => setPassword(event.target.value)}
                type='password'
            />

            {errorMessage && <SpanErrorMessage>{errorMessage}</SpanErrorMessage>}

            <Button onClick={HandleButtonSubmitOnClick}
                text={buttonSendString}
            />

            <ContainerTextAnchor>
                <TextAnchor to='/signup'
                    onMouseOver={() => setCreateUserAnchor(createUserOverString)}
                    onMouseOut={() => setCreateUserAnchor(createUserDefaultString)}>
                    {createUserAnchor}
                </TextAnchor>
                <TextAnchor to='/forgetPassword'
                    onMouseOver={() => setForgetPasswordAnchor(forgetPasswordOverString)}
                    onMouseOut={() => setForgetPasswordAnchor(forgetPasswordDefaultString)}>
                    {forgetPasswordAnchor}
                </TextAnchor>
            </ContainerTextAnchor>
                        
        </Form>
    );
}
