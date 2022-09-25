import styled from 'styled-components';

export const ContainerButtonSubmit = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 13px;
`;

export const ButtonSubmit = styled.div`
    font-size: 16px;
    border: none;
    border-radius: 10px;
    color: #fff;
    line-height: 1.2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background: #1B406A;

    &:hover {
        box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);
    }
`;