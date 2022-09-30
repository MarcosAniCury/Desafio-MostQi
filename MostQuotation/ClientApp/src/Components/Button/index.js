import { ContainerButtonSubmit, ButtonSubmit } from './styles';

export default function Button({ onClick, text, style }) {
    return (
        <ContainerButtonSubmit>
            <ButtonSubmit onClick={onClick} style={style}>{text}</ButtonSubmit>
        </ContainerButtonSubmit>    
    );
}