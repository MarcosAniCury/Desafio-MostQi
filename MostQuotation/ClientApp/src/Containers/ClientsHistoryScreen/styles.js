// Modules
import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: 100vh;
    color: white;
    grid-template-rows: 0.1fr 0.4fr 0.4fr 4fr 0.1fr;
    grid-template-columns: 0.1fr 2fr 2fr 2fr;
    grid-template-areas:
        "logo nav nav nav"
        "sidebar pagination-top pagination-top pagination-top"
        "sidebar filter filter filter"
        "sidebar content content content"
        "logout pagination-bottom pagination-bottom pagination-bottom";
`;

export const ContainerFilter = styled.nav`
    grid-area: filter;
    background-color: #EBEBEB;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const ContainerPaginationTop = styled.div`
    grid-area: pagination-top;
    background-color: #EBEBEB;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContainerContent = styled.div`
    grid-area: content;
    background-color: #EBEBEB;
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
    background-color: #EBEBEB;
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
            color: #FFFFFF;`
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
    background-color: #1B406A;
`;

export const NavbarTitle = styled.span`
    color: #FFFFFF;
    margin-bottom: 4px;
    font-size: 50px;
`;

export const InputFilter = styled.input`
    font-size: 15px;
    color: black;
    line-height: 1.2;
    border: none;
    width: 100%;
    height: 36px;
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

export const WarpFilter = styled.div`
    width: 20%;
    padding: 4px;
`;

export const WarpButton = styled.div`
    margin-right: 10px;
    width: 8%;
`;

export const ContainerTitle = styled.div`
    width: 85%;
    height: 70px;
    margin-top: 20px;
    background-color: #1B406A;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SpanTitle = styled.span`
    color: #FFFFFFF;
    margin-left: 10px;
    font-size: 26px;
`;