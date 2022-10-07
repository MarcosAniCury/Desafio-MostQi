//Modules
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LineChart,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Brush
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
    ContainerGrid,
    ContainerAverage,
    ContainerMax,
    ContainerMin,
    IconLogout,
    Logo,
    ContainerFilterWarp,
    SpanFilterTitle,
    WarpFilterButton,
    WarpFilterItem,
    ContainerCardWarp,
    CardTitle,
    CardDescription,
    ContainerGraphWarp,
    ContainerGraphBox,
    CustomizeDatePicker,
    SpanTitleDatePicker,
    SpanError,
    ContainerGridBox,
    ButtonSelectPage,
    IconPaginate,
    ItensPaginate,
    ContainerPaginate,
    Row,
    GridTitle,
    ContainerGridTitle,
    ContainerTooltip,
    SpanTooltip,
    ContainerBoxTooltip
} from './styles';
import "react-datepicker/dist/react-datepicker.css";

//Img
import MostQuotationLogo from '../../Assets/MostQuotationIcon.jpeg';

export default function QuotationScreen() {
    //useState
    const [isLoading, setIsLoading] = useState(false);
    const [initialDate, setInitialDate] = useState(new Date().setDate(new Date().getDate() - 7));
    const [finalDate, setFinalDate] = useState(new Date());
    const [graphData, setGraphData] = useState(new Date());
    const [gridData, setGridData] = useState(undefined);
    const [average, setAverage] = useState();
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [error, setError] = useState(undefined);
    const [pageIndex, setPageIndex] = useState(1);
    const [showPage, setShowPage] = useState(1);

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
            setError('Data inicial não pode estar vazia');
            return false;
        }
        if (!finalDate || finalDate === '') {
            setError('Data final não pode estar vazia');
            return false;
        }
        return true;
    }

    const HandleClickFilter = async page => {
        setIsLoading(true);
        if (FieldsValidation()) {
            setError(undefined);
            const userToken = JSON.parse(localStorage.getItem('token'));
            const response = await API.getQuotationWithFilter(moment(initialDate).format('YYYY-MM-DD'), moment(finalDate).format('YYYY-MM-DD'), page, userToken.access_token);
            if (response.success || response.data.success) {
                setPageIndex(page);
                if (showPage + 2 < page || page < showPage) {
                    setShowPage(page);
                }
                setGraphData(response.data.quotation.map(quotation => {
                    return {
                        'Data': moment(quotation.dateTime).format('DD/MM/YYYY HH:mm:ss'),
                        'Cotacao': quotation.quotation
                    };
                }));
                setGridData(response.data.quotations_items);
                setAverage(response.data.average);
                setMin(response.data.min);
                setMax(response.data.max);
            } else {
                setError(response.data.errors[0]);
            }
        }
        setIsLoading(false);
    };

    const Filter = useCallback(() => (
        <ContainerFilterWarp>
            <SpanFilterTitle>Filtro:</SpanFilterTitle>
            <InputFilterItem title="Data inicial:" value={initialDate} setState={setInitialDate} />
            <InputFilterItem title="Data final:" value={finalDate} setState={setFinalDate} />
            <WarpFilterButton onClick={async() => await HandleClickFilter(pageIndex)} >
                <Button text="Filtrar" style={{ backgroundColor: '#FFFFFF', color: 'black', paddingBottom: '0' }} />
            </WarpFilterButton>
        </ContainerFilterWarp>
    ), [HandleClickFilter, initialDate, finalDate]);

    const InputFilterItem = useCallback(({ title, value, setState }) => (
        <WarpFilterItem>
            <SpanTitleDatePicker>{title}</SpanTitleDatePicker>
            <CustomizeDatePicker
                selected={value}
                onChange={date => setState(date)}
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
            />
        </WarpFilterItem>
    ), [])

    const Card = useCallback(({ title, description }) => (
        <ContainerCardWarp>
            <CardTitle>{description ? title : 'Filtre um período'}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </ContainerCardWarp>
    ), []);

    const ButtonPaginate = useCallback(({ text, isSelect }) => (
        <ButtonSelectPage isSelect={isSelect} onClick={async () => HandleClickFilter(text)}>
            <ItensPaginate>
                {text}
            </ItensPaginate>
        </ButtonSelectPage>
    ), [pageIndex, showPage]);

    const Paginate = useCallback(({ style }) => (
        <ContainerPaginate style={style}>
            <ButtonSelectPage onClick={async () => HandleClickFilter(pageIndex - 1)}>
                <IconPaginate className='fa-sharp fa-solid fa-caret-left' />
            </ButtonSelectPage>
            <ButtonPaginate text={showPage} isSelect={pageIndex === showPage} />
            <ButtonPaginate text={showPage + 1} isSelect={pageIndex === showPage + 1} />
            <ButtonPaginate text={showPage + 2} isSelect={pageIndex === showPage + 2} />
            <ButtonSelectPage onClick={async () => HandleClickFilter(pageIndex + 1)}>
                <IconPaginate className='fa-sharp fa-solid fa-caret-right' />
            </ButtonSelectPage>
        </ContainerPaginate>
    ), [showPage, pageIndex, initialDate, finalDate]);

    const GridItem = useCallback(({ description }) => (
        <ContainerGridTitle>
            <GridTitle>{description}</GridTitle>
        </ContainerGridTitle>    
    ), [])

    const GridRow = useCallback(({ firstDescription, secondDescription }) => (
        <Row>
            <GridItem description={firstDescription} />
            <GridItem description={secondDescription} />
        </Row>    
    ), []);

    const Grid = useCallback(() => (
        <ContainerGridBox>
            <Paginate style={{ marginTop: '10px' }} />
            {gridData &&
                <GridRow firstDescription="Data e hora" secondDescription="Cotacao" />}
            {gridData &&
                gridData.map((data, key) => <GridRow key={gridData.dateTime} firstDescription={moment(data.dateTime).format('DD/MM/YYYY HH:mm:ss')} secondDescription={data.quotation} />)}
            <Paginate style={{ marginBottom: '10px' }} />
        </ContainerGridBox>    
    ), [gridData]);

    const CustomTooltip = (props) => {
        if (props.payload && props.payload.length >= 1) {
            const { Data, Cotacao } = props.payload[0].payload;

            return (
                <ContainerBoxTooltip>
                    <ContainerTooltip>
                        <SpanTooltip>Data: {Data}</SpanTooltip>
                    </ContainerTooltip>
                    <ContainerTooltip>
                        <SpanTooltip>Cotacao: {Cotacao}</SpanTooltip>
                    </ContainerTooltip>
                </ContainerBoxTooltip>
            );
        } else {
            return (<SpanTooltip />);
        }
    };

    const Graph = useCallback(() => (
        <ContainerGraphBox>
            {graphData && <ContainerGraphWarp width="90%" aspect={3}>
                <LineChart data={graphData}>
                    <CartesianGrid />
                    <XAxis dataKey="Data"
                        interval={'preserveStartEnd'} />
                    <YAxis type="number" domain={[5.15, 5.5]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line dataKey="Cotacao"
                        stroke="#1B406A" activeDot={{ r: 8 }} />
                    <Brush dataKey="Data" height={30} stroke="#8884d8" />
                </LineChart>
            </ContainerGraphWarp>}
        </ContainerGraphBox>
    ), [graphData]);

    return (
        <Container>
            {isLoading && <Loading />}
            <ContainerNav>
                <Logo src={MostQuotationLogo} />
                <IconLogout className="fa-solid fa-right-from-bracket" onClick={HandleClickLogout}/>
            </ContainerNav>
            <ContainerFilter>
                <Filter />
                {error && <SpanError>{error}</SpanError>}
            </ContainerFilter>
            <ContainerAverage>
                <Card title="Média" description={average} />
            </ContainerAverage>
            <ContainerMax>
                <Card title="Máxima" description={max} />
            </ContainerMax>
            <ContainerMin>
                <Card title="Mínima" description={min} />
            </ContainerMin>
            <ContainerGraph>
                <Graph />
            </ContainerGraph>
            <ContainerGrid>
                <Grid />
            </ContainerGrid>
        </Container>
    );
}