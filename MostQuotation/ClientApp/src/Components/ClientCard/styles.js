import styled from 'styled-components';

export const ContainerCardClient = styled.div`
    grid-area: ${props => `card${props.cardI}`};
    background-color: #EBEBEB;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContainerCardClientImage = styled.div`
    height: 100%;
    width: 186px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 20px;
`;

export const ContainerCardClientDesription = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    ${props => !props.isFirst && 'padding-top: 10px;'}
    border-radius: 10px;
`;

export const CardClientImg = styled.img`
    height: 86%;
    width: auto;
    border-radius: 10px;
`;

export const CardClient = styled.div`
    width: 70%;
    height: 80%;
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: #1B406A;
    border-radius: 10px;
`;

export const SpanTitleCard = styled.span`
    font-size: 20px;
    color: #FFFFFF;
`;

export const SpanDescriptionCard = styled.span`
    font-size: 20px;
    padding-left: 10px;
    color: #FFFFFF;
`;

export const Column = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 90%;
    padding-left: 30px;
`;