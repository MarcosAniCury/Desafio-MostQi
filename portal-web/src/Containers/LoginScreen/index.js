import React, { useCallback, useState } from 'react';
import { API } from '../../Services/API';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [returnApi, setReturnApi] = useState(null);

    const HandleButtonSubmitOnClick = useCallback(async () => {
        if (username !== '' && password !== '' && email !== '') {
            const response = await API.login(username, email, password);
            setReturnApi(response);
        }
    }, [username, password, email, returnApi, API.lo]);

    return (
        <div>
            Nome de usuario:
            <input type='text' value={username} onChange={event => setUsername(event.target.value)} id='username' />
            Email:
            <input type='text' value={email} onChange={event => setEmail(event.target.value)} id='email' />
            Senha:
            <input type='text' value={password} onChange={event => setPassword(event.target.value)} id='password' />
            <button onClick={HandleButtonSubmitOnClick}>Submit</button>
            {returnApi?.success && (
                <h1>{returnApi.data.name}</h1>
             )}
        </div>
    );
}
