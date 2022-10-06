//Modules
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LineChart,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import moment from "moment";

//Services
import { API } from '../../Services/API';

//Hooks
import { useAuth } from '../../Hooks/auth';

//Components
import Loading from '../../Components/Loading';
import Button from '../../Components/Button';

//Styles
import {
    Container,
    ContainerNav,
    ContainerFilter,
    ContainerGraph,
    ContainerAverage,
    ContainerMax,
    ContainerMin,
    IconLogout,
    Logo,
    ContainerFilterWarp,
    SpanFilterTitle,
    WarpFilterButton,
    WarpFilterItem,
    InputFilter,
    ContainerCardWarp,
    CardTitle,
    CardDescription,
    ContainerGraphWarp,
    ContainerGraphBox
} from './styles';

//Img
import MostQuotationLogo from '../../Assets/MostQuotationIcon.jpeg';

export default function QuotationScreen() {
    //useState
    const [isLoading, setIsLoading] = useState(false);
    const [initialDate, setInitialDate] = useState();
    const [finalDate, setFinalDate] = useState();
    const [graphData, setGraphData] = useState();
    const [average, setAverage] = useState();
    const [min, setMin] = useState();
    const [max, setMax] = useState();

    //Navigate
    const navigate = useNavigate();

    //Auth
    const { logout } = useAuth();

    const HandleClickLogout = () => {
        logout();
        navigate('/');
    };

    const FieldsValidation = () => {
        if (!initialDate || initialDate === '') {
            return false;
        }
        if (!finalDate || finalDate === '') {
            return false;
        }
        return true;
    }

    const HandleClickFilter = async () => {
        setIsLoading(true);
        if (FieldsValidation()) {
            const userToken = JSON.parse(localStorage.getItem('token'));
            const response = await API.getQuotationWithFilter(initialDate, finalDate, userToken.access_token);
            if (response.success) {
                console.log(response);
                setGraphData(response.data.quotation.map(quotation => {
                    return {
                        'Data': moment(quotation.dateTime).format('DD/MM/YYYY HH:mm:ss'),
                        'Cotacao': quotation.quotation
                    };
                }));
                setAverage(response.data.average);
                setMin(response.data.min);
                setMax(response.data.max);
                console.log(graphData);
            }
        }
        setIsLoading(false);
    };

    const Filter = useCallback(() => (
        <ContainerFilterWarp>
            <SpanFilterTitle>Filtro:</SpanFilterTitle>
            <InputFilterItem title="Data Inicial" value={initialDate} setState={setInitialDate} />
            <InputFilterItem title="Data Final" value={finalDate} setState={setFinalDate} />
            <WarpFilterButton onClick={HandleClickFilter} >
                <Button text="Filtrar" style={{ backgroundColor: '#FFFFFF', color: 'black', paddingBottom: '0' }} />
            </WarpFilterButton>
        </ContainerFilterWarp>
    ), []);

    const InputFilterItem = useCallback(({ title, value, setState }) => (
        <WarpFilterItem>
            <InputFilter value={value} onChange={event => setState(event.target.value)} placeholder={title} />
        </WarpFilterItem>
    ), [])

    const Card = useCallback(({ title, description }) => (
        <ContainerCardWarp>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </ContainerCardWarp>
    ), []);

    return (
        <Container>
            {isLoading && <Loading />}
            <ContainerNav>
                <Logo src={MostQuotationLogo} />
                <IconLogout className="fa-solid fa-right-from-bracket" onClick={HandleClickLogout}/>
            </ContainerNav>
            <ContainerFilter>
                <Filter />
            </ContainerFilter>
            <ContainerGraph>
                <ContainerGraphBox>
                    <ContainerGraphWarp width="90%" aspect={2}>
                        <LineChart data={graphData}>
                            <CartesianGrid />
                            <XAxis dataKey="Data"
                                interval={'preserveStartEnd'} />
                            <YAxis></YAxis>
                            <Tooltip />
                            <Line dataKey="Cotacao"
                                stroke="#1B406A" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ContainerGraphWarp>
                </ContainerGraphBox>
            </ContainerGraph>
            <ContainerAverage>
                <Card title="Média" description={average} />
            </ContainerAverage>
            <ContainerMax>
                <Card title="Máxima" description={max} />
            </ContainerMax>
            <ContainerMin>
                <Card title="Mínima" description={min} />
            </ContainerMin>
        </Container>
    );
}