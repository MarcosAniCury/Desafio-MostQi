//Imports react
import { createContext, useEffect, useState, useContext } from 'react';

//Services
import { API } from '../Services/API';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        (async () => { 
            const userToken = localStorage.getItem('token');
            const userStorage = localStorage.getItem('user');

            if (userToken && userToken.access_token < new Date().toISOString() && userStorage) {
                const dbUser = await API.getUserById(userStorage.id, userToken.access_token);

                if (dbUser.sucess) {
                    setUser(dbUser.data);
                }
            }
        })();
    }, [user]);

    const signin = async (username, password) => {
        const responseUser = await API.signin(username, password);
        if (responseUser.success) {
            setUser(responseUser.data);
            setErrorMessage({});
        } else {
            const key = Object.keys(responseUser.errors)[0];
            setErrorMessage({
                key: [key],
                message: responseUser.errors[key][0]
            });
        }
        return;
    };

    return (
        <AuthContext.Provider
            value={{ user, errorMessage, signed: !!user, signin }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };