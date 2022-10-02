// Modules
import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: 100vh;
    color: white;
    grid-template-rows: 0.1fr 0.4fr 0.4fr 4fr 0.1fr;
    grid-template-columns: 0.1fr 2fr 2fr 2fr;
    grid-template-areas:
        "logo nav nav nav"
        "sidebar pagination-top pagination-top pagination-top"
        "sidebar filter filter filter"
        "sidebar content content content"
        "logout pagination-bottom pagination-bottom pagination-bottom";
`;