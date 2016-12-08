import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

var StudentList = React.createClass({
  propTypes: {
    onItemClick:   React.PropTypes.func
  },
  
  changeHandler: function(e) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e.target.value);
    }
  },
  
  renderToolbar: function(name) {
    return (
      <Ons.Toolbar>
        <div className='center'>{name}</div>
      </Ons.Toolbar>
    );
  },

  renderRow: function(row, index) {
    return (
      <Ons.ListItem key={index} onClick={this.changeHandler}>
        <div className='left'>
          V A
        </div>
        <div className='center'>
          Corso di culo
        </div>
        <div className='right'>
          13:30 - 16:00

        </div>
      </Ons.ListItem>
    );
  },

  render: function(name) {
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
        <Ons.List
          dataSource={[1, 2]}
          renderRow={this.renderRow}
          />
      </Ons.Page>
    );
  }
});


var Parent = React.createClass({

  getInitialState: function() {
    return {
      value: 'foo'
    }
  },

  changeHandler: function(value) {
    this.setState({
      value: value
    });
  },

  render: function() {
    return (
      <div>
        <Child value={this.state.value} onChange={this.changeHandler} />
        <span>{this.state.value}</span>
      </div>
    );
  }
});

var Child = React.createClass({
  propTypes: {
    value:      React.PropTypes.string,
    onChange:   React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      value: ''
    };
  },
  changeHandler: function(e) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e.target.value);
    }
  },
  render: function() {
    return (
      <input type="text" value={this.props.value} onChange={this.changeHandler} />
    );
  }
});




var App = React.createClass({
  
  onUserClick: function(index){
    
  },
  
  renderToolbar: function(route, navigator) {
    const backButton = route.hasBackButton
    ? <Ons.BackButton onClick={this.handleClick.bind(this, navigator)}>Back</Ons.BackButton>
          : null;

    return (
      <Ons.Toolbar>
        <div className='left'>{backButton}</div>
        <div className='center'>{route.title}</div>
      </Ons.Toolbar>
    );
  },

  handleClick: function(navigator) {
    ons.notification.confirm('Do you really want to go back?')
      .then((response) => {
      if (response === 1) {
        navigator.popPage();
      }
    });
  },

  pushPage: function(navigator) {
    navigator.pushPage({
      title: `Another page`,
      hasBackButton: true
    });
  },

  renderPage: function(route, navigator) {
    if(route.type == 'course'){
      return(
        <StudentList key={route.title} onItemClick={this.onUserInput} name={"Stuede"}></StudentList>
      )
    }
    else{
      return (
        <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
          <section style={{margin: '16px', textAlign: 'center'}}>
            <Ons.Button onClick={this.pushPage.bind(this, navigator)}>
              Push Page
            </Ons.Button>
          </section>
        </Ons.Page>
      );
    }
  },

  render: function() {
    return (
      <Ons.Navigator
        renderPage={this.renderPage}
        initialRoute={{
          type: 'course'
        }}
        />
    );
  }
});


export default App;
