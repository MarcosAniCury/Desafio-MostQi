import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: 100vh;
    color: white;
    grid-template-rows: 0.1fr 1fr 1fr 1fr 0.1fr;
    grid-template-columns: 0.1fr 2fr 2fr 2fr;
    grid-template-areas:
        "logo selfie doc-front doc-back"
        "sidebar selfie doc-front doc-back"
        "sidebar input-first input-first input-first"
        "sidebar input-second input-second input-second"
        "logout footer footer footer";
`;

export const ContainerSelfie = styled.div`
    grid-area: selfie;
    background-color: #00C6C1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;    
`;

export const ContainerDocFront = styled.div`
    grid-area: doc-front;
    background-color: #00C6C1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;  
`;

export const ContainerDocBack = styled.div`
    grid-area: doc-back;
    background-color: #00C6C1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;  
`;

export const SpanIputPhotoDescription = styled.span`
    color: black; 
    margin-bottom: 20px;
`;

export const ContainerInput = styled.div`
    grid-area: ${props => `input-${props.gridSpace}`};
    background-color: #00C6C1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

export const ContainerInputText = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column; 
`;

export const InputText = styled.input``;

export const InputTitle = styled.span`
    margin-bottom: 4px;
`;

export const Footer = styled.div`
    grid-area: footer;
    background-color: #00C6C1;
    display: flex;
    justify-content: center;
`;

export const ButtonDiv = styled.div`
    width: 30%;
`;

export const ContainerPerfilImg = styled.div`
    height: 240px;
    width: 200px;
    background: transparent;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    outline: 0;
`;

export const ImgPerfil = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
`;

export const ContainerLiveness = styled.div`
    position: absolute;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

export const ContainerImage = styled.div`
    width: 70%;
    height: 700px;
    margin-bottom: 20px;
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

export const ContainerDropzone = styled.div`
    height: 240px;
    width: 200px;
`; 

export const SpanTitleLiveness = styled.span`
    margin-bottom: 40px;
    font-size: 20px;
`;