import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');


const UserList = observer(React.createClass({
    renderRow: function(row, index) {
	
	
		let attendee = this.props.manager.courseAttendees[index];
		return (
            <Ons.ListItem key={index} onClick={this.props.handleOnClick.bind(this.props.parent, index)} tappable>
                <div className='center'>
                    {attendee.name}
                </div>
                <div className='left'>
                    {this.props.manager.isAttendeeConfirmed(attendee) ? <Ons.Icon icon='ion-checkmark, material:md-check' /> : <div></div>}
                </div>
            </Ons.ListItem>
        );
    },

    render: function() {
        return (
            <Ons.List
                dataSource={this.props.manager.courseAttendees.map(item => item.name)}
                renderRow={this.renderRow}
                renderHeader={() => <Ons.ListHeader>{"Partecipanti"}</Ons.ListHeader>}

            />
        );
    }
}));


export default UserList;
