//React imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Hooks
import { useAuth } from '../Hooks/auth';

//Screens
import Login from '../Containers/LoginScreen';
import CreateUser from '../Containers/CreateUserScreen';
import ClientsData from '../Containers/ClientsDataScreen';
import NotFound from '../Containers/NotFoundScreen';

const Private = ({ Item }) => {
    const { signed } = useAuth();
    return signed != 0 ? <Item /> : <Login />;
};

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <>
                <Routes>
                    <Route path='/collaborator' element={<Private Item={ClientsData} />} />
                    <Route path='/singup' element={<CreateUser />} />
                    <Route path='/' element={<Login />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </>
        </BrowserRouter>
    );
};