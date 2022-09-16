import styled from 'styled-components';

export const ContainerImageCropper = styled.div`
    position: absolute;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

export const ContainerImage = styled.div`
    width: 80%;
    heigth: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Img = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

export const ButtonExit = styled.button`
    position: absolute;
    top:10px;
    right:10px;
    width: 80px;
    height: 80px;
    font-size: 50px;
    border: none;
    background-color: transparent;
`;