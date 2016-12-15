import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');


const CoursesList = observer(React.createClass({
    renderRow: function(row, index) {
	
	
		let dataSource = this.props.dataSource[index];
		return (
            <Ons.ListItem key={index} onClick={this.props.handleOnClick.bind(this.props.parent, index)} tappable>
                <div className='center'>
                    {dataSource.name + " " + dataSource.surname}
                </div>
            </Ons.ListItem>
        );
    },

    render: function() {
        return (
            <Ons.List
                dataSource={this.props.dataSource.map(item => item.name)}
                renderRow={this.renderRow}
                />
        );
    }
}));


export default CoursesList;