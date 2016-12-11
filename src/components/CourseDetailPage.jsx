import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

import CourseDetail from './CourseDetail';


var CourseDetailPage = observer(React.createClass({
    renderToolbar: function(route, navigator) {
        const backButton = route.hasBackButton
        ? <Ons.BackButton onClick={this.handleClick.bind(this, navigator)}>Indietro</Ons.BackButton>
              : null;

        return (
            <Ons.Toolbar>
                <div className='left'>{backButton}</div>
                <div className='center'>{route.title}</div>
            </Ons.Toolbar>
        );
    },

    handleClick: function(navigator) {
        navigator.goBack();
    },
    
    handleButtonClick: function(){
        ons.notification.confirm('Vuoi veramente partecipare?')
            .then((response) => {
            if (response === 1) {
            }
        });
    }, 
    
    renderBottomToolbar: function(){
      return(
      <Ons.BottomToolbar modifier="material"><Ons.Button modifier="large--cta" onClick={this.handleButtonClick}>Partecipa!</Ons.Button> </Ons.BottomToolbar>
      )  
    },

    render: function() {
        var route = this.props.route;
        var navigator = this.props.navigator;
       return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this, route, navigator)}
                renderBottomToolbar={this.renderBottomToolbar}>
           <CourseDetail course={{
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                  time: '08:00 - 09:00',
                    room: 'VA',
                      host: 'Emanuele di Vizio'
              }}></CourseDetail>
           
           </Ons.Page>
        );
    }
}));


export default CourseDetailPage;
