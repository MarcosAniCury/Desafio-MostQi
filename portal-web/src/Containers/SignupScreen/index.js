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
    const createUserDefaultString = 'Voce ja possui uma conta?';
    const createUserOverString = 'Faca login agora';
    const emptyInputUsernameString = 'O campo usuario nao pode ser vazio';
    const notInRangeInputPasswordString = 'O campo senha deve ter entre 6 e 50 caracteres';
    const notEmailValidationInputEmailString = 'O campo email nao e um email valido';

    //Components name
    const titleString = 'Cadastrar';
    const placeholderUserInputString = 'Usuario';
    const placeholderPasswordInputString = 'Senha';
    const placeholderEmailInputString = 'Email';
    const buttonSendString = 'Criar'

    //API validations
    const InputNameString = 'Name';
    const InputPasswordString = 'Password';

    //useStates
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [createUserAnchor, setCreateUserAnchor] = useState(createUserDefaultString);
    const [errorStyleUsername, setErrorStyleUsername] = useState(false);
    const [errorStylePassword, setErrorStylePassword] = useState(false);
    const [errorStyleEmail, setErrorStyleEmail] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    //Auth
    const { errorMessage: errorMessageApi, signup } = useAuth();

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
            setErrorMessage(notInRangeInputPasswordString)
            isAllInputFull = false;
        }

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
            if (await signup(username, email, password, 'collaborator')) {
                alert('Usuario cadastrado com sucesso');
                navigate('/');
            }
        }
    };

    //Every time singup and return erro update states
    useEffect(() => {
        setErrorMessage(errorMessageApi?.message);
        InputErrorApiStyleHandle(errorMessageApi?.key);
    }, [errorMessageApi]);

    return (
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
                <TextAnchor to='/'
                    onMouseOver={() => setCreateUserAnchor(createUserOverString)}
                    onMouseOut={() => setCreateUserAnchor(createUserDefaultString)}>
                    {createUserAnchor}
                </TextAnchor>
            </ContainerTextAnchor>          
        </Form>
    );
}
