//React imports
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';

//Hooks
import { useAuth } from '../Hooks/auth';

//Screens
import Signin from '../Containers/SigninScreen';
import Signup from '../Containers/SignupScreen';
import ClientsData from '../Containers/ClientsDataScreen';
import CreateClient from '../Containers/CreateClientScreen';
import NotFound from '../Containers/NotFoundScreen';
import ForgetPassword from '../Containers/ForgetPasswordScreen';
import RecoverPassword from '../Containers/RecoverPasswordScreen';
import ClientsHistory from '../Containers/ClientsHistoryScreen';
import Quotation from '../Containers/QuotationScreen';

const Private = ({ Item, type }) => {
    const { signed, user, logout } = useAuth();
    if (signed != 0 && user.type == type) {
        return <Item />;
    } else {
        logout();
        return <Signin />;
    }
};

const RecoverPasswordLink = () => {
    let { token } = useParams();
    return <RecoverPassword token={token} />
};

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <>
                <Routes>
                    <Route path='/collaborator' element={<Private Item={ClientsData} type="collaborator" />} />
                    <Route path='/collaborator/client/create' element={<Private Item={CreateClient} type="collaborator" />} />
                    <Route path='/collaborator/client/history' element={<Private Item={ClientsHistory} type="collaborator" />} />
                    <Route path='/client' element={<Private Item={Quotation} type="client" />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/forgetPassword' element={<ForgetPassword />} />
                    <Route path='/recoverPassword/:token' element={<RecoverPasswordLink />} />
                    <Route path='/' element={<Signin />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </>
        </BrowserRouter>
    );
};