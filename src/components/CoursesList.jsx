import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');


const CoursesList = observer(React.createClass({
    renderRow: function(row, index) {


        return (
            <Ons.ListItem key={index} onClick={this.props.handleOnClick.bind(this.props.parent, index)} tappable>
                <div className='center'>
                    {this.props.dataSource[index].name}
                </div>
            </Ons.ListItem>
        );
    },

    render: function() {
        return (
            <Ons.List
                dataSource={this.props.dataSource.map(item => item.name)}
                renderRow={this.renderRow}
                renderHeader={() => <Ons.ListHeader>{this.props.title}</Ons.ListHeader>}
                />
        );
    }
}));


export default CoursesList;