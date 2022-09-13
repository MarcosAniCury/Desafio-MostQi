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
            const userToken = JSON.parse(localStorage.getItem('token'));
            const userStorage = JSON.parse(localStorage.getItem('user'));

            if (userToken && userToken.expired_in > new Date().toISOString() && userStorage) {
                const dbUser = await API.getUserById(userStorage.id, userToken.access_token);

                if (dbUser.sucess) {
                    setUser(dbUser.data);
                }
            } else {
                setUser(undefined);
            }
        })();
    }, [user, localStorage]);

    const signin = async (username, password) => {
        const responseUser = await API.signin(username, password);
        if (responseUser.success) {
            localStorage.setItem('token', JSON.stringify(responseUser.token));
            localStorage.setItem('user', JSON.stringify(responseUser.data));
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

    const signup = async (username, email, password, type) => {
        const responseUser = await API.signup(username, email, password, type);
        if (responseUser.success) {
            setErrorMessage({});
        } else {
            const key = Object.keys(responseUser.errors)[0];
            setErrorMessage({
                key: [key],
                message: responseUser.errors[key][0]
            });
        }
        return responseUser.success;
    };

    const forgetPassword = async (username, email) => {
        const response = await API.forgetPassword(username, email);
        if (response.success) {
            setErrorMessage({});
        } else {
            const key = Object.keys(response.errors)[0];
            setErrorMessage({
                key: [key],
                message: response.errors[key][0]
            });
        }
        return response.success;
    };

    const recoverPassword = async (password, confirmPassword) => {

    };

    return (
        <AuthContext.Provider
            value={{ user, errorMessage, signed: !!user, signin, signup, forgetPassword, recoverPassword }}
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