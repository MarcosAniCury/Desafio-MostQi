import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: 100vh;
    color: white;
    grid-template-rows: 0.1fr 0.1fr 1.2fr 0.1fr;
    grid-template-columns: ${props => props.isSidebarOpen ? '0.5fr' : '0.1fr'} 2fr 2fr 2fr;
    grid-template-areas:
        "logo nav nav nav"
        "sidebar pagination-top pagination-top pagination-top"
        "sidebar content content content"
        "logout pagination-bottom pagination-bottom pagination-bottom";
`;

export const ContainerNavBar = styled.nav`
    grid-area: nav;
    background-color: #1B406A;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContainerSidebar = styled.div`
    grid-area: sidebar;
    background-color: #F8F8F8;
    display: flex;
    flex-direction: column;
`;

export const ContainerPaginationTop = styled.div`
    grid-area: pagination-top;
    background-color: #00C6C1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContainerContent = styled.div`
    grid-area: content;
    background-color: black;
`;

export const ContainerPaginationBottom = styled.div`
    grid-area: pagination-bottom;
    background-color: #00C6C1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContainerLogo = styled.div`
    grid-area: logo;
    background-color: #F8F8F8;
`;

export const ContainerLogout = styled.div`
    grid-area: logout;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    background-color: #F8F8F8;
`;

export const Logo = styled.img`
    width: ${props => props.isOnlyIcon ? '150px' : '74px'};
    heigth: ${props => props.isOnlyIcon ? '150px' : '74px'};
    padding: 10px;
`;

export const Input = styled.input`
    font-size: 15px;
    color: #FFFFFF;
    line-height: 1.2;
    border: none;
    width: 80%;
    height: 30px;
    background-color: #1B406A;
    border-radius: 10px 0px 0px 10px;
    padding-left: 10px;

    &:focus {
        outline: 0;
        box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
    }

    ::placeholder {
        color:white;
    }
`;

export const ButtonResarch = styled.button`
    height: 30px;
    width: 30px;
    background-color: transparent;
    border-radius: 0px 10px 10px 0px;
`;

export const IconLogout = styled.i.attrs(props => ({
    className: props.className,
}))`
    font-size: 30px;
    color: black;
    padding: 22px 0px 22px 22px;
`;

export const ButtonSelectPage = styled.button`
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    border: none;
    border-radius: 5px;

    ${props => props.isSelect ? `
            background-color: #1B406A;
            color: white;`
        : `
            color: black;
            background-color: transparent;
            &: hover {
                background-color: #ddd;
            }`
    }
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

export const IconLogoutDescription = styled.span`
    color: black;
    font-size: 18px;
    padding-left: 10px;
`;

export const IconPaginate = styled.i.attrs(props => ({
    className: props.className,
}))`
    font-size: 16px;
`;

export const ItensPaginate = styled.span`
    font-size: 16px;
`;