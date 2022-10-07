//Imports react
import { createContext, useEffect, useState, useContext } from 'react';

//Services
import { API } from '../Services/API';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    //useState
    const [user, setUser] = useState();

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
        } else {
            return responseUser.errors[0];
        }
        return responseUser.success;
    };

    const signup = async (username, email, password, type) => {
        const responseUser = await API.signup(username, email, password, type);
        if (!responseUser.success) {
            return responseUser.errors[0];
        }
        return responseUser.success;
    };

    const forgetPassword = async (username, email) => {
        const response = await API.forgetPassword(username, email);
        if (!response.success) {
            return response.errors[0];
        }
        return response.success;
    };

    const recoverPassword = async (password, confirmPassword, access_token) => {
        const response = await API.recoverPassword(password, confirmPassword, access_token);
        if (!response.success) {
            return response.errors[0];
        }
        return response.success;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(undefined);
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signup, logout, forgetPassword, recoverPassword }}
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