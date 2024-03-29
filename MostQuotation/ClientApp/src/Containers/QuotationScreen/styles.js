﻿// Modules
import { ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: 100vh;
    color: white;
    grid-template-rows: 0.2fr 0.2fr 1fr 1fr 1fr;
    grid-template-columns: 2fr 2fr 2fr;
    grid-template-areas:
        "nav nav nav"
        "filter filter filter"
        "average max min"
        "grid graph graph"
        "grid graph graph";
`;

export const ContainerNav = styled.div`
    grid-area: nav;
    background-color: #F8F8F8;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ContainerFilter = styled.nav`
    grid-area: filter;
    background-color: #EBEBEB;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const ContainerAverage = styled.div`
    grid-area: average;
    background-color: #EBEBEB;
    display: flex;
    align-items: end;
    justify-content: center;
    flex-direction: column;
    padding-right: calc((100% - 85%) * 3 / 2);
`;

export const ContainerMax = styled.div`
    grid-area: max;
    background-color: #EBEBEB;
    display: flex;
    align-items: end;
    justify-content: center;
    flex-direction: column;
    padding-right: calc((100% - 85%) * 3 / 2);
`;

export const ContainerMin = styled.div`
    grid-area: min;
    background-color: #EBEBEB;
    display: flex;
    align-items: end;
    justify-content: center;
    flex-direction: column;
    padding-right: calc((100% - 85%) * 3 / 2);
`;

export const ContainerGraph = styled.div`
    grid-area: graph;
    background-color: #EBEBEB;
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: center;
    flex-direction: column;
    padding-right: calc((100% - 85%) * 3 / 4);
`;

export const ContainerGrid = styled.div`
    grid-area: grid;
    background-color: #EBEBEB;
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    padding-left: calc((100% - 85%) * 3 / 2);
`;

export const Logo = styled.img`
    width: 150px;
    heigth: 150px;
    padding: 6px;
`;

export const IconLogout = styled.i.attrs(props => ({
    className: props.className,
}))`
    font-size: 30px;
    color: #1B406A;
    padding: 22px 0px 22px 22px;
    margin-right: 20px;
`;

export const ContainerFilterWarp = styled.div`
    width: 85%;
    height: 70px;
    margin-top: 20px;
    background-color: #1B406A;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SpanFilterTitle = styled.span`
    color: #FFFFFFF;
    margin-left: 10px;
    font-size: 26px;
`;

export const WarpFilterButton = styled.div`
    margin-right: 10px;
    width: 8%;
`;

export const WarpFilterItem = styled.div`
    width: 20%;
    padding: 4px;
`;

export const ContainerCardWarp = styled.div`
    width: 70%;
    height: 70%;
    border-radius: 10px;
    background-color: #1B406A;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const CardTitle = styled.span`
    font-size: 30px;
`;

export const CardDescription = styled.span`
    font-size: 50px;
`;

export const ContainerGraphBox = styled.div`
    width: 87%;
    height: 90%;
    border-style: solid;
    border-width: 6px;
    border-color: #1B406A;
    border-radius: 10px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContainerGraphWarp = styled(ResponsiveContainer)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 40px;
`;

export const CustomizeDatePicker = styled(DatePicker)`
    font-size: 15px;
    color: black;
    line-height: 1.2;
    border: none;
    width: 100%;
    height: 36px;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding-left: 10px;

    &:focus {
        outline: 0;
        box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
    }

    ::placeholder {
        color:black;
    }
`;

export const SpanTitleDatePicker = styled.span``;

export const SpanError = styled.span`
    margin-top: 20px;
    color: red;
    margin-bottom: 10px;
`;

export const ContainerGridBox = styled.div`
    width: 90%;
    height: 90%;
    border-style: solid;
    border-width: 6px;
    border-color: #1B406A;
    border-radius: 10px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`;

export const ContainerPaginationBottom = styled.div`
    grid-area: pagination-bottom;
    background-color: #EBEBEB;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonSelectPage = styled.button`
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    border: none;
    border-radius: 5px;

    ${props => props.isSelect ? `
            background-color: #1B406A;
            color: #FFFFFF;`
        : `
            color: black;
            background-color: transparent;
            &: hover {
                background-color: #ddd;
            }`
    }
`;

export const IconPaginate = styled.i.attrs(props => ({
    className: props.className,
}))`
    font-size: 16px;
`;

export const ItensPaginate = styled.span`
    font-size: 16px;
`;

export const ContainerPaginate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 40px;
    border-width: 4px;
    border-color: #1B406A;
`;

export const ContainerGridTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-style: solid;
    border-width: 4px;
    border-color: #1B406A;
`;

export const GridTitle = styled.span`
    color: #1B406A;
`;

export const ContainerBoxTooltip = styled.div`
    border-style: solid;
    border-width: 2px;
    border-color: #1B406A;
    border-radius: 10px;
    background-color: #FFFFFF;
    padding: 5px 10px;
`;

export const ContainerTooltip = styled.div`
    padding-top: 4px;
    padding-bottom: 4px;
`;

export const SpanTooltip = styled.span`
    color: #1B406A;
`;