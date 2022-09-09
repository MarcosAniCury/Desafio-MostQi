import React, { useCallback, useState } from 'react';
import { API } from '../../Services/API';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [returnApi, setReturnApi] = useState(null);


    const HandleButtonSubmitOnClick = useCallback(async () => {
        if (username !== '' && password !== '') {
            const isLogin = await API.login(username, password);
            setReturnApi(isLogin);
        }
    }, [username, password, returnApi]);

    return (
        <div>
            Nome de usuario:
            <input type='text' value={username} onChange={event => setUsername(event.target.value)} id='username' />
            Senha:
            <input type='text' value={password} onChange={event => setPassword(event.target.value)} id='password' />
            <button onClick={HandleButtonSubmitOnClick}>Submit</button>
            {returnApi !== null && (
                <h1>{returnApi.data}</h1>
             )}
        </div>
    );
}
