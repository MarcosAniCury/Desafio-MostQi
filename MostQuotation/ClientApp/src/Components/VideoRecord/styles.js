import styled from 'styled-components';

export const ContainerImage = styled.div`
    width: 60%;
    height: 70vh;
`;

export const ContainerButton = styled.div``;

export const VideoShow = styled.video`
    width: 100%;
    height: 100%;
`;

export const Icon = styled.i.attrs(props => ({
    className: props.className,
}))`
    padding: 20px;
    margin: 0 10px 10px 10px;
    background-color: #1B406A;
    background-color: #1B406A;
    border-radius: 10px;
`;