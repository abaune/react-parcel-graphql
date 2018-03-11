import React from "react";
import ReactDOM from "react-dom";

// Components
import BandsLandingPage from './components/bandsLandingPage';

// Assets
require('./assets/sass/app');

ReactDOM.render(
    <BandsLandingPage />,
    document.getElementById('app')
);
