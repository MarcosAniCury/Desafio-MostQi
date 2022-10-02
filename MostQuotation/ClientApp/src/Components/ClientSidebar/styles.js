import styled from 'styled-components';

export const ContainerSidebar = styled.div`
    grid-area: sidebar;
    background-color: #F8F8F8;
    display: flex;
    flex-direction: column;
    z-index: 20;
`;

export const IconSidebarController = styled.i.attrs(props => ({
    className: props.className,
}))`
    color: black;
    padding-top: 14px;
    margin-left: 22px;
    font-size: 32px;
`;

export const IconSidebar = styled.i.attrs(props => ({
    className: props.className,
}))`
    color: black;
    padding-top: 26px;
    margin-left: 22px;
    font-size: 26px;
`;

export const ContainerIconSidebar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
`;

export const IconSidebarDescription = styled.span`
    color: black;
    text-align: right;
    padding-left: 10px;
    font-size: 18px;
`;

export const ContainerLogo = styled.div`
    grid-area: logo;
    background-color: #F8F8F8;
    z-index: 20;
`;

export const Logo = styled.img`
    width: ${props => props.isOnlyIcon ? '150px' : '74px'};
    heigth: ${props => props.isOnlyIcon ? '150px' : '74px'};
    padding: 10px;
`;

export const ContainerLogout = styled.div`
    grid-area: logout;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    background-color: #F8F8F8;
    z-index: 20;
`;

export const IconLogout = styled.i.attrs(props => ({
    className: props.className,
}))`
    font-size: 30px;
    color: black;
    padding: 22px 0px 22px 22px;
`;

export const IconLogoutDescription = styled.span`
    color: black;
    font-size: 18px;
    padding-left: 10px;
`;