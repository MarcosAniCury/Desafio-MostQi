import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
`;

export const ContainerMessage = styled.div`    
`;

export const SpanTitle = styled.span`
    display: block;
    font-size: 300px;
    font-weight:bold;
    text-align: center;
`;

export const SpanDescription = styled.span`
    font-size: 50px;
    text-align: center;
`;

export const Icon = styled.i.attrs(props => ({
    className: props.className,
}))`
    color: #1B406A;
    font-size: 250px;
`;