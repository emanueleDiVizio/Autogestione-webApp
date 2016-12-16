import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');

import CoursePage from './CoursesPage'

const CoursesPageContainer = observer(React.createClass({
    componentDidMount: function(){
	},

    handleOnClick: function(index){
        this.props.manager.select(index);
    },

    handleOnBack: function(){
        this.props.manager.goBack();
    },

    render: function() {
        return (
            <CoursePage parent={this} type={this.props.type} data={this.props.manager.data} handleOnClick={this.handleOnClick} handleOnBack={this.handleOnBack}></CoursePage>
        );
    }
}));


export default CoursesPageContainer;