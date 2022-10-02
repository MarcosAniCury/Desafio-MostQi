//Imports react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Hooks
import { useAuth } from '../../Hooks/auth';

//styles
import {
    ContainerSidebar,
    IconSidebarController,
    ContainerIconSidebar,
    IconSidebar,
    IconSidebarDescription,
    ContainerLogo,
    Logo,
    ContainerLogout,
    IconLogout,
    IconLogoutDescription
} from './styles.js';

//Img
import MostQuotationLogo from '../../Assets/MostQuotationIcon.jpeg';
import MostLogo from '../../Assets/MostIcon.jpeg';

export default function Sidebar({ isCollaborator = true }) {
    //useState
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    //Navigate
    const navigate = useNavigate();

    //Auth
    const { logout } = useAuth();

    const HandleClickLogout = () => {
        logout();
        navigate('/');
    };

    const SidebarLogo = () => (
        <ContainerLogo>
            <Logo src={isSidebarOpen ? MostQuotationLogo : MostLogo}
                isOnlyIcon={isSidebarOpen}
            />
        </ContainerLogo>
    );

    const SidebarItems = () => (
        <ContainerSidebar>
            <IconSidebarController className="fa-solid fa-bars"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <ContainerIconSidebar onClick={() => navigate('/collaborator')} >
                <IconSidebar className="fa-sharp fa-solid fa-house-blank" />
                {isSidebarOpen &&
                    <IconSidebarDescription>
                        Menu
                    </IconSidebarDescription>
                }
            </ContainerIconSidebar>
            <ContainerIconSidebar onClick={() => navigate('/collaborator/client/create')}>
                <IconSidebar className="fa-regular fa-address-card" />
                {isSidebarOpen &&
                    <IconSidebarDescription>
                        Cadastro
                    </IconSidebarDescription>
                }
            </ContainerIconSidebar>
            <ContainerIconSidebar onClick={() => navigate('/collaborator/client/history')}>
                <IconSidebar className="fa-solid fa-clock-rotate-left" />
                {isSidebarOpen &&
                    <IconSidebarDescription>
                        Historico
                    </IconSidebarDescription>
                }
            </ContainerIconSidebar>
        </ContainerSidebar>
    );

    const SidebarLogout = () => (
        <ContainerLogout onClick={HandleClickLogout}>
            <IconLogout className="fa-solid fa-right-from-bracket" />
            {isSidebarOpen &&
                < IconLogoutDescription >
                    Logout
                </IconLogoutDescription>
            }
        </ContainerLogout>    
    );

    return (
        <>
            <SidebarLogo />
            <SidebarItems />
            <SidebarLogout />
        </>
    );
}