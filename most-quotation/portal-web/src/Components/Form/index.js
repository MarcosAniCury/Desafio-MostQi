import { ContainerBody, ContainerLogin, WrapLogin, ContainerForm } from './styles';

export default function Form(props) {
    return (
        <ContainerBody>
            <ContainerLogin>
                <WrapLogin>
                    <ContainerForm>
                        {props.children}
                    </ContainerForm>
                </WrapLogin>
            </ContainerLogin>
        </ContainerBody>
    );
}