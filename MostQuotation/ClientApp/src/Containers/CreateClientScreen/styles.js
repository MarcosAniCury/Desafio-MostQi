import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: 100vh;
    color: white;
    grid-template-rows: 0.2fr 2fr 0.1fr;
    grid-template-columns: 0.1fr 2fr 2fr 0.1fr;
    grid-template-areas:
        "logo navbar navbar navbar"
        "sidebar content content content"
        "logout footer footer footer";
`;

export const ContainerSelfie = styled.div`
    grid-area: selfie;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;    
`;

export const ContainerInputText = styled.div`
    margin-top: 50px;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: row; 
    width: 100%;
`;

export const InputText = styled.input`
    color: black;
    margin-left: 10px;
    height: 24px;
    width: 100%;
    border-style: none none solid none;
    padding-left: 4px;
    font-size: 20px;

    &:focus {
        outline: 0;
    }
`;

export const InputTitle = styled.span`
    white-space: nowrap;
    color: black;
    margin-bottom: 4px;
    font-size: 20px;
    font-family: Montserrat;
    font-weight: 500;
    max-width: 34%;
`;

export const Footer = styled.div`
    grid-area: footer;
    background-color: #1B406A;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const ButtonDiv = styled.div`
    width: 40%;
`;

export const ContainerPerfilImg = styled.div`
    height: 280px;
    width: 240px;
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
    background-color: rgba(0, 0, 0, 0.7);
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
    ${props => !props.isSelfie ? 'margin-left: 30px;' : ''}
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
    color: red;
`;

export const ContainerPerfilEmpty = styled.div`
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

export const NavBarTitle = styled.span`
    margin-bottom: 4px;
    font-size: 50px;
`;

export const ContainerNavBar = styled.span`
    grid-area: navbar;
    background-color: #1B406A;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;   
`;

export const ContainerButtonSubmit = styled.div`
    margin-top: ${props => props.hasErrorMessage ? '10px;' : '30px;'}
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
`;