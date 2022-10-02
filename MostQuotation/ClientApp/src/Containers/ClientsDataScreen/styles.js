import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: 100vh;
    color: white;
    grid-template-rows: 0.1fr 0.1fr 1.2fr 0.1fr;
    grid-template-columns: 0.1fr 2fr 2fr 2fr;
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

export const InputResearch = styled.input`
    font-size: 15px;
    color: black;
    line-height: 1.2;
    border: none;
    width: 80%;
    height: 40px;
    background-color: #FFFFFF;
    border-radius: 10px 0px 0px 10px;
    padding-left: 10px;

    &:focus {
        outline: 0;
        box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.8);
    }

    ::placeholder {
        color:black;
    }
`;

export const ButtonResearch = styled.button`
    height: 44px;
    width: 40px;
    background-color: #d3d3d3;
    border-radius: 0px 10px 10px 0px;
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