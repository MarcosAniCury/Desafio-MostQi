//Styles
import { ContainerLoading, LoadingIcon } from './styles';

//Image
import LoadingGif from '../../Assets/loading.gif';

export default function Loading() {
    return (
        <ContainerLoading>
            <LoadingIcon src={LoadingGif} />
        </ContainerLoading>
    );
}