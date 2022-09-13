import { ContainerButtonSubmit, ButtonSubmit } from './styles';

export default function Button({ onClick, text }) {
    return (
        <ContainerButtonSubmit>
            <ButtonSubmit onClick={onClick}>{text}</ButtonSubmit>
        </ContainerButtonSubmit>    
    );
}