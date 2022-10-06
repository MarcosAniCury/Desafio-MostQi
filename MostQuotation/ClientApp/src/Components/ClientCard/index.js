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

//Translates
import { translate } from './translate';
 
export default function ClientCard({ client, index, paramsShow }) {
    const CardClientItems = ({ title, description, isFirst }) => (
        <ContainerCardClientDesription isFirst={isFirst}>
            <SpanTitleCard>{title}</SpanTitleCard>
            <SpanDescriptionCard>{description}</SpanDescriptionCard>
        </ContainerCardClientDesription>
    );

    const getSecondItemDescription = () => { 
        const formatter = translate[paramsShow[2]] === translate['dateOfBirth'] ?
            'DD/MM/YYYY' :
            'DD/MM/YYYY HH:mm:ss';

        return moment(client[paramsShow[2]]).format(formatter);
     }
    

    return (
        <ContainerCardClient cardI={index}>
            <CardClient>
                <ContainerCardClientImage>
                    <CardClientImg src={`data:image/jpeg;base64,${client.selfie}`} />
                </ContainerCardClientImage>
                <Column>
                    <CardClientItems title={translate[paramsShow[0]] + ":"} description={client[paramsShow[0]]} isFirst={true} />
                    <CardClientItems title={translate[paramsShow[1]] + ":"} description={client[paramsShow[1]]} />
                    <CardClientItems title={translate[paramsShow[2]] + ":"} description={getSecondItemDescription()} />
                    <CardClientItems title={translate[paramsShow[3]] + ":"} description={client[paramsShow[3]]} />
                </Column>
            </CardClient>
        </ContainerCardClient>
    );
}