import styled from 'styled-components';

export const ContainerImage = styled.div`
    width: 200px;
    heigth: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
`;

export const Img = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

export const Container = styled.div`
    display: grid;
    height: 100vh;
    color: white;
    grid-template-rows: 2fr 2fr 2fr 2fr;
    grid-template-columns: 0.1fr 2fr 2fr 2fr;
    grid-template-areas:
        "logo selfie doc-front doc-back"
        "sidebar selfie doc-front doc-back"
        "sidebar input input input"
        "logout input input input";
`;

export const ContainerSelfie = styled.div`
    grid-area: selfie;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;    
`;

export const ContainerDocFront = styled.div`
    grid-area: doc-front;
    background-color: black;
`;

export const ContainerDocBack = styled.div`
    grid-area: doc-back;
    background-color: blue;
`;

export const InputImage = styled.input`
    
`;