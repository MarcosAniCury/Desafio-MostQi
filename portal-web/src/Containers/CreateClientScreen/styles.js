import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: 100vh;
    color: white;
    grid-template-rows: 0.2fr 0.3fr 1fr 1fr 1fr 0.1fr;
    grid-template-columns: 0.1fr 2fr 2fr 2fr;
    grid-template-areas:
        "logo navbar navbar navbar"
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
    padding-top: 10px;
`;

export const ContainerDocBack = styled.div`
    grid-area: doc-back;
    background-color: #00C6C1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;  
    padding-top: 10px;
`;

export const SpanInputPhotoDescription = styled.span`
    font-family: Montserrat;
    color: #FFFFFF; 
    font-size: 26px;
    font-weight: 500;
`;

export const SpanInputPhotoDetail = styled.span`
    font-family: Montserrat;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 800;
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
    width: 30%;
    height: 24%;
`;

export const InputText = styled.input`
    height: 100%;
    width: ${props => props.bigSize ? '100%' : '40%'};
    border: none;
    border-radius: 4px;
    padding-left: 4px;
    font-size: 20px;
`;

export const InputTitle = styled.span`
    margin-bottom: 4px;
    font-size: 20px;
    font-family: Montserrat;
    font-weight: 500;
`;

export const Footer = styled.div`
    grid-area: footer;
    background-color: #00C6C1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    min-width: 60%;
    min-height: 60%;
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
    z-index: 10;
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
    position: absolute; 
    bottom: 40px;
    background-color: #62AF1B;
    color: white;
    margin-top: 10px;
    padding: 12px 120px 12px 120px;
    border: none;
    font-size: 20px;
    border-radius: 10px;
`;

export const Icon = styled.i.attrs(props => ({
    className: props.className,
}))``;

export const ContainerDropzone = styled.div`
    margin-top: 20px;
    height: 240px;
    width: 200px;
`; 

export const SpanTitleLiveness = styled.span`
    position: absolute;
    top: 50px;
    margin-bottom: 40px;
    font-size: 20px;
`;

export const SpanErrorLiveness = styled.span`
    margin-bottom: 40px;
    font-size: 16px; 
    color: red;
`;

export const SpanErrorMessage = styled.span`
    margin-bottom: 10px;
    font-size: 20px; 
    color: black;
`;

export const ContainerPerfilEmpty = styled.div`
    margin-top: 20px;
    height: 100%;
    width: 100%;
    background: ${props => props.showImage ? 'transparent' : '#e1faec'};
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    outline: 0;
`;

export const ContainerPerfilEmptyText = styled.div`
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    border-radius: 10px;
    border: 1px dashed #79ab7f;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333;
`;

export const SpanPerfilEmpty = styled.span`
    padding-top: 10px;
    text-align: center;
`;

export const ContainerNavBar = styled.span`
    grid-area: navbar;
    background-color: #1B406A;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NavBarTitle = styled.span`
    margin-bottom: 4px;
    font-size: 30px;
    font-family: Montserrat;
    font-weight: 500;
`;