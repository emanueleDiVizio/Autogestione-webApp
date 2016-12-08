import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {observable} from 'mobx';
import {action} from 'mobx';
import {observer} from 'mobx-react';

var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var appState = observable({
    timer: 0
})

appState.resetTimer = action(function reset() {
    appState.timer = 0;
});

setInterval(action(function tick() {
    appState.timer += 1;
}), 1000);

const TimerView = observer(class TimerView extends React.Component {
    render() {
        return (<button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.appState.timer}
            </button>);
    }

    onReset () {
        this.props.appState.resetTimer();
    }
}
);



var App = React.createClass({
  renderToolbar: function() {
    return (
      <Ons.Toolbar>
        <div className='center'>List</div>
      </Ons.Toolbar>
    );
  },

  renderRow: function(row, index) {
    const x = 40 + Math.round(5 * (Math.random() - 0.5)),
          y = 40 + Math.round(5 * (Math.random() - 0.5));

    const names = ['Max', 'Chloe', 'Bella', 'Oliver', 'Tiger', 'Lucy', 'Shadow', 'Angel'];
    const name = names[Math.floor(names.length * Math.random())];

    return (
      <Ons.ListItem key={index}>
        <div className='left'>
          <img src={`http://placekitten.com/g/${x}/${y}`} className='list__item__thumbnail' />
        </div>
        <div className='center'>
        <TimerView appState={appState}/>

        </div>
      </Ons.ListItem>
    );
  },

  render: function() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
        <Ons.List
          dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          renderRow={this.renderRow}
          renderHeader={() => <Ons.ListHeader>Cute cats</Ons.ListHeader>}
        />
      </Ons.Page>
    );
  }
});



export default App;
