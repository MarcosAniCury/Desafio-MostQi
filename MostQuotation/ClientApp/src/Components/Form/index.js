import { ContainerBody, ContainerLogin, WrapLogin, ContainerForm } from './styles';

export default function Form(props) {
    return (
        <ContainerBody isGrid={props.isGrid}>
            <ContainerLogin isGrid={props.isGrid}>
                <WrapLogin>
                    <ContainerForm>
                        {props.children}
                    </ContainerForm>
                </WrapLogin>
            </ContainerLogin>
        </ContainerBody>
    );
}