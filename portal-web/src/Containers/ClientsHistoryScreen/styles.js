import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: 100vh;
    color: white;
    grid-template-rows: 0.1fr 0.4fr 0.4fr 4fr 0.1fr;
    grid-template-columns: 0.1fr 2fr 2fr 2fr;
    grid-template-areas:
        "logo nav nav nav"
        "sidebar filter filter filter"
        "sidebar pagination-top pagination-top pagination-top"
        "sidebar content content content"
        "logout pagination-bottom pagination-bottom pagination-bottom";
`;

export const ContainerFilter = styled.nav`
    grid-area: filter;
    background-color: #d3d3d3;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
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
    background-color: #1B406A;
    display: grid;
    height: 100%;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 2fr 2fr;
    grid-template-areas:
        "card0 card1"
        "card2 card3"
`;

export const ContainerPaginationBottom = styled.div`
    grid-area: pagination-bottom;
    background-color: #00C6C1;
    display: flex;
    align-items: center;
    justify-content: center;
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

export const IconPaginate = styled.i.attrs(props => ({
    className: props.className,
}))`
    font-size: 16px;
`;

export const ItensPaginate = styled.span`
    font-size: 16px;
`;

export const ContainerNavbar = styled.div`
    grid-area: nav;
    display: flex;
    align-items: center;
    justify-content: center;   
    background-color: #d3d3d3;
`;

export const NavbarTitle = styled.span`
    color: black;
    margin-bottom: 4px;
    font-size: 30px;
    font-family: Montserrat;
    font-weight: 500;
`;

export const InputFilter = styled.input`
    font-size: 15px;
    color: black;
    line-height: 1.2;
    border: none;
    width: 100%;
    height: 24px;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding-left: 10px;

    &:focus {
        outline: 0;
        box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
    }

    ::placeholder {
        color:black;
    }
`;

export const FilterTitle = styled.span`
    padding-bottom: 4px;
`;

export const WarpFilter = styled.div`
    display: flex;
    width: 20%;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
`;

export const WarpButton = styled.div`
    width: 8%;
`;