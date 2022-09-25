//Modules
import moment from "moment";

//Styles
import {
    ContainerCardClient,
    ContainerCardClientImage,
    ContainerCardClientDesription,
    CardClientImg,
    CardClient,
    SpanTitleCard,
    SpanDescriptionCard,
    Column
} from './styles';

export default function ClientCard({ client, index }) {
    const CardClientItems = ({ title, description, isFirst }) => (
        <ContainerCardClientDesription isFirst={isFirst}>
            <SpanTitleCard>{title}</SpanTitleCard>
            <SpanDescriptionCard>{description}</SpanDescriptionCard>
        </ContainerCardClientDesription>
    );

    return (
        <ContainerCardClient cardI={index}>
            <CardClient>
                <ContainerCardClientImage>
                    <CardClientImg src={`data:image/jpeg;base64,${client.selfie}`} />
                </ContainerCardClientImage>
                <Column>
                    <CardClientItems title="Nome:" description={client.name} isFirst={true} />
                    <CardClientItems title="RG:" description={client.rg} />
                    <CardClientItems title="Data de Nascimento:" description={moment(client.dateOfBirth).format('DD/MM/YYYY')} />
                    <CardClientItems title="Email:" description={client.email} />
                </Column>
            </CardClient>
        </ContainerCardClient>
    );
}