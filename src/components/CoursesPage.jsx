import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');



import CoursesList from './CoursesList'

var CoursesPage = observer(React.createClass({
    renderToolbar: function(route, navigator) {
        const backButton = route.hasBackButton
        ? <Ons.BackButton onClick={this.handleClick.bind(this, navigator)}>Indietro</Ons.BackButton>
              : null;

        return (
            <Ons.Toolbar>
                <div className='left'>{backButton}</div>
                <div className='center'>Corsi</div>
            </Ons.Toolbar>
        );
    },

    handleClick: function(navigator) {
        navigator.goBack();
    },

    render: function() {
        var route = this.props.route;
        var navigator = this.props.navigator;
        var manager = this.props.manager;
       return (
            <Ons.Page renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
                <CoursesList source={manager}/>
            </Ons.Page>
        );
    }
}));


export default CoursesPage;
