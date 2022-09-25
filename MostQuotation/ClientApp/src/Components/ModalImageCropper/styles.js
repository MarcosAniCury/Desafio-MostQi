import styled from 'styled-components';

export const ContainerImageCropper = styled.div`
    position: absolute;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

export const ContainerImage = styled.div`
    width: 70%;
    heigth: 70%;
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
    color: #FFFFFF;
    border: none;
    background-color: transparent;
`;

export const ButtonFinish = styled.button`
    background-color: #62AF1B;
    color: white;
    margin-top: 10px;
    padding: 6px 60px 6px 60px;
    border: none;
    font-size: 20px;
    border-radius: 10px;
`;

export const Icon = styled.i.attrs(props => ({
    className: props.className,
}))``;