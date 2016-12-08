import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import '../node_modules/onsenui/css/onsenui.css';
import '../node_modules/onsenui/css/onsen-css-components.css';

var ons = require('onsenui');
var Ons = require('react-onsenui');


ons.ready(function() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});

