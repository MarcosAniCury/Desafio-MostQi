import styled from 'styled-components';

export const IconExport = styled.i.attrs(props => ({
    className: props.className,
}))``;

export const SpanDescription = styled.span`
    padding-top: 10px;
    text-align: center;
`;

export const ContainerDropzone = styled.div`
    height: 240px;
    width: 200px;
    background: #e1faec;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 48px;
    outline: 0;
`;

export const ContainerItems = styled.div`
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    border-radius: 10px;
    border: 1px dashed #79ab7f;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333;
`