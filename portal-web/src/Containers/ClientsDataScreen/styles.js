import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: 100vh;
    color: white;
    grid-template-rows: 0.1fr 0.1fr 1.2fr 0.1fr;
    grid-template-columns: ${props => props.expandSideBar ? '0.4fr' : '0.1fr'} 1fr 0.5fr 0.5fr;
    grid-template-areas:
        "sidebar nav nav nav"
        "sidebar pagination-top pagination-top pagination-top"
        "sidebar content content content"
        "sidebar pagination-bottom pagination-bottom pagination-bottom";
    text-align: center;
    grid-gap: 0.25rem;
`;

export const ContainerNavBar = styled.nav`
    grid-area: nav;
    background-color: red;
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

export const ButtonResarch = styled.button``;