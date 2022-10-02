import styled from 'styled-components';

export const IconExport = styled.i.attrs(props => ({
    className: props.className,
}))``;

export const SpanDescription = styled.span`
    padding-top: 10px;
    text-align: center;
`;

export const ContainerDropzone = styled.div`
    height: 100%;
    width: 100%;
    background: ${props => props.showImage ? 'transparent' : '#e1faec'};
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
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

export const Img = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
`; 