import React, {Component} from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');


import CoursesList from './CoursesList'

var CoursesPage = observer(React.createClass({
	generateTitle: function (type) {
		switch (type) {
			case 0:
				return "Corsi Disponibili";
			case 1:
				return "Corsi Da Seguire";
			case 2:
				return "Corsi Da Gestire";
		}
	},
	
	renderToolbar: function (handleOnBack) {
		return (
			<Ons.Toolbar>
				<div className='center'>{this.generateTitle(this.props.type)}</div>
			</Ons.Toolbar>
		);
	},
	
	
	render: function () {
		var data = this.props.data;
		console.log(this.props.data)
		
		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
				{this.props.loading ? <div style={{transform: 'translateY(150%)', textAlign: 'center'}}><Ons.ProgressCircular indeterminate/></div>
					: <CoursesList parent={this.props.parent} dataSource={data} title="Corsi del 20/12/2016"
								   handleOnClick={this.props.handleOnClick}></CoursesList>
				}
			</Ons.Page>
		);
	}
}));


export default CoursesPage;
