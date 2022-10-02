import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SpanTitle = styled.span`
    display: block;
    font-size: 30px;
    color: #1B406A;
    line-height: 1.2;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 50px;
`;

export const SpanErrorMessage = styled.span`
    display: block;
    font-size: 14px;
    color: #FD3737;
    line-height: 1.2;
    text-align: center;
    margin-bottom: 30px;
`;

export const ContainerTextAnchor = styled.div`
    padding-top: 13px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const TextAnchor = styled(Link)`
    font-size: 16px;
    color: #00C6C1;
    line-height: 1.5;
    text-decoration: none;
    margin-top: 10px
`;