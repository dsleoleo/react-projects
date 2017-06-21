import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import "./css/variables.scss";
import "./css/layout.scss";
import "./css/notionalInput.scss";
import "./css/priceButton.scss";
import "./css/priceMovement.scss";
import "./css/spotTile.scss";
import "./css/tradeNotification.scss";

require('file-loader?name=[name].[ext]!../index.html');
require('file-loader?name=[name].[ext]!../app.yaml');

ReactDOM.render(<App />, document.getElementById('root'));