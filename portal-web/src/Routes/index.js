//React imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Hooks
import { useAuth } from '../Hooks/auth';

//Screens
import Signin from '../Containers/SigninScreen';
import Signup from '../Containers/SignupScreen';
import ClientsData from '../Containers/ClientsDataScreen';
import NotFound from '../Containers/NotFoundScreen';
import ForgetPassword from '../Containers/ForgetPasswordScreen';
import RecoverPassword from '../Containers/RecoverPasswordScreen';

const Private = ({ Item }) => {
    const { signed } = useAuth();
    return signed != 0 ? <Item /> : <Signin />;
};

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <>
                <Routes>
                    <Route path='/collaborator' element={<Private Item={ClientsData} />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/forgetPassword' element={<ForgetPassword />} />
                    <Route path='/recoverPassword/:token' element={<RecoverPassword />} />
                    <Route path='/' element={<Signin />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </>
        </BrowserRouter>
    );
};