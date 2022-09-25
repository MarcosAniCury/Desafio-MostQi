import styled from 'styled-components';

export const ContainerCardClient = styled.div`
    grid-area: ${props => `card${props.cardI}`};
    background-color: #1B406A;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContainerCardClientImage = styled.div`
    background-color: #d3d3d3;
    height: 296px;
    width: 186px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 20px;
`;

export const ContainerCardClientDesription = styled.div`
    background-color: #d3d3d3;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    ${props => !props.isFirst && 'padding-top: 10px;'}
`;

export const CardClientImg = styled.img`
    background-color: #d3d3d3;
    height: 90%;
    width: auto;
    border-radius: 10px;
`;

export const CardClient = styled.div`
    width: 64%;
    height: 80%;
    display: flex;
    align-items: stretch;
    flex-direction: row;
    background-color: #d3d3d3;
    border-radius: 10px;
`;

export const SpanTitleCard = styled.span`
    font-size: 20px;
    color: black;
`;

export const SpanDescriptionCard = styled.span`
    font-size: 20px;
    padding-left: 10px;
    color: black;
`;

export const Column = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;