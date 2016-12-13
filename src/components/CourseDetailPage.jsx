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
        console.log(this.props.course)
		let course = this.props.course;
		return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this, route, navigator)}
                renderBottomToolbar={this.renderBottomToolbar}>
           <CourseDetail course={{
           	description: course.description,
           	time: course.startHour + " - " + course.endHour,
                    room: course.room,
                      host: course.hosts.map(function (host) {
						  return host.name + " " + host.surname
					  }).reduce(function (a, b) {
						  return a + ", " + b;
					  }/*, "" //IN CASE IT'S EMPTY */)
              }}></CourseDetail>
           
           </Ons.Page>
        );
    }
}));


export default CourseDetailPage;
