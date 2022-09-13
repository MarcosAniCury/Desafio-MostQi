import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: 100vh;
    color: white;
    grid-template-rows: 0.1fr 0.1fr 1.2fr 0.1fr;
    grid-template-columns: ${props => props.expandSideBar ? '0.4fr' : '0.1fr'} 1fr 0.5fr 0.5fr;
    grid-template-areas:
        "logo nav nav nav"
        "sidebar pagination-top pagination-top pagination-top"
        "sidebar content content content"
        "sidebar pagination-bottom pagination-bottom pagination-bottom";
    text-align: center;
`;

export const ContainerNavBar = styled.nav`
    grid-area: nav;
    background-color: #F8F8F8;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContainerSidebar = styled.div`
    grid-area: sidebar;
    background-color: blue;
`;

export const ContainerPaginationTop = styled.div`
    grid-area: pagination-top;
    background-color: purple;
`;

export const ContainerContent = styled.div`
    grid-area: content;
    background-color: black;
`;

export const ContainerPaginationBottom = styled.div`
    grid-area: pagination-bottom;
    background-color: green;
`;

export const ContainerLogo = styled.div`
    grid-area: logo;
    background-color: #F8F8F8;
`;

export const Logo = styled.img`
    width: 170px;
    heigth: 170px;
    padding: 10px;
`;

export const Input = styled.input`
    font-size: 15px;
    color: black;
    line-height: 1.2;
    border: none;
    width: 80%;
    height: 30px;
    background-color: #1B406A;
    border-radius: 10px 0px 0px 10px;

    &:focus {
        outline: 0;
        box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
    }
`;

export const ButtonResarch = styled.button`
    height: 30px;
    width: 30px;
    background-color: #00C6C1;
    border-radius: 0px 10px 10px 0px;
`;