import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

import CourseDetail from './CourseDetail';


class CourseDetailManager{
	constructor(index){
		extendObservable(this, {
			course: {},
			
			displayCourse: action(function(){
				
			})
		})
	}
	
	
}

var CourseDetailContainer = observer(React.createClass({
	
    render: function() {
		<CourseDetail course={this.props.manager.course}></CourseDetail>
    }
}));


export default CourseDetailPage;
