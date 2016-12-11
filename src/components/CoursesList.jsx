import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');


const CoursesList = observer(React.createClass({
    renderRow: function(row, index) {

        const object = this.props.source.data[index];

        return (
            <Ons.ListItem key={index} onClick={() => {this.props.source.select(index)}} tappable>
                <div className='center'>
                    {object.title}
                </div>
            </Ons.ListItem>
        );
    },

    render: function() {
        return (
            <Ons.List
                dataSource={this.props.source.dataNames}
                renderRow={this.renderRow}
                renderHeader={() => <Ons.ListHeader>Courses</Ons.ListHeader>}
                />
        );
    }
}));


export default CoursesList;