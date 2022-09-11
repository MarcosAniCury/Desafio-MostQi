//Imports react
import React from 'react';
import ReactDOM from 'react-dom/client';

//Route
import RoutesApp from './Routes'

//Styles
import { createGlobalStyle } from 'styled-components';

//Hooks
import { AuthProvider } from './Hooks/auth';


const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

    * {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-style: normal;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <RoutesApp />
        <GlobalStyle />
    </AuthProvider>
);
