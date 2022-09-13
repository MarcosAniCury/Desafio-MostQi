import styled from 'styled-components';

export const LoadingIcon = styled.img`
    width: 100px;
    height: 100px;
`;

export const ContainerLoading = styled.div`
    position: absolute;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    z-index: 10;
    background-color: black;
    opacity: 0.4;
`;