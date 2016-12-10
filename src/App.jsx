import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';

import AppContainer from './AppContainer.js'

var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var index = 0;

var App = observer(React.createClass({

  render: function() {
    return (
      <AppContainer/>
    );
  }
}));


export default App;
