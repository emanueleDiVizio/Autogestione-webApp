import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

import CoursesList from './CoursesList'

const CoursesListContainer = observer(React.createClass({
    componentDidMount: function(){
    	this.props.manager.displayCoursesToJoin();
	},
	
	handleOnClick: function(index){
    	this.props.manager.select(index);
	},

    render: function() {
        return (
            <CoursesList parent={this} dataSource={this.props.manager.data} title="Corsi" handleOnClick={this.handleOnClick}></CoursesList>
        );
    }
}));


export default CoursesListContainer;