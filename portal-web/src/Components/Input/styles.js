import styled from 'styled-components';

export const WarpInput = styled.div`
    width: 100%;
    position: relative;
    border: 2px solid ${props => props.error ? 'red' : '#d3d3d3'};
    border-radius: 4px;
    margin-bottom: 37px;
`;

export const InputStyled = styled.input`
    font-size: 15px;
    color: black;
    line-height: 1.2;
    border: none;
    display: block;
    width: 100%;
    height: 45px;
    background-color: transparent;
    padding: 0 5px;

    &:focus {
        outline: 0;
        box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
    }
`;