import styled from 'styled-components';

export const ContainerBody = styled.div`
    ${props => props.isGrid ? 'grid-area: content;' : ''}
    width: 100%;
    margin: 0 auto;
`;

export const ContainerLogin = styled.div`
    width: 100%;
    min-height: ${props => props.isGrid ? '100%;' : '100vh;'}
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: #1B406A;
`;

export const WrapLogin = styled.div`
    display: flex;
    min-width: 390px;
    background-color: #FFF;
    border-radius: 10px;
    overflow: hidden;
    padding: 0px 55px 33px 55px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
`;

export const ContainerForm = styled.form`
    width: 100%;
`;