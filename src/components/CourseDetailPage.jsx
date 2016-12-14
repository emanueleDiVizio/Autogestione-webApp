import React, {Component} from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

import CourseDetail from './CourseDetail';



var CourseDetailPage = observer(React.createClass({
	
	componentDidMount: function(){
		this.props.manager.displayCourse()
	},
	handleOnBackClick: function (manager) {
		manager.goBack();
	},
	
	handleConfirmClick: function (manager) {
		ons.notification.confirm('Vuoi veramente partecipare?')
			.then((response) => {
				if (response === 1) {
					manager.join()
				}
			});
	},
	
	renderToolbar: function (manager) {
		return (
			<Ons.Toolbar>
				<div className='left'><Ons.BackButton
					onClick={this.handleOnBackClick.bind(this, manager)}>Indietro</Ons.BackButton>
				</div>
				<div className='center'>{manager.title}</div>
			</Ons.Toolbar>
		);
	},
	
	renderBottomToolbar: function (manager) {
		return (
			<Ons.BottomToolbar modifier="material"><Ons.Button modifier="large--cta" onClick={this.handleConfirmClick.bind(this, manager)}>Partecipa!</Ons.Button>
			</Ons.BottomToolbar>
		)
	},
	
	render: function () {
		var manager = this.props.manager;
		return (
			<Ons.Page renderToolbar={this.renderToolbar.bind(this, manager)}
					  renderBottomToolbar={this.renderBottomToolbar.bind(this, manager)}>
				<CourseDetail course={manager.courseToDisplay}></CourseDetail>
			
			</Ons.Page>
		);
	}
}));


export default CourseDetailPage;
