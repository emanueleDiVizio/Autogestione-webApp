import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');


const CoursesList = observer(React.createClass({
    renderRow: function(row, index) {

        function getHour(hour){
            let finalHour;
            let hourLeft = hour.split(":")[0];
            let hourRight = hour.split(":")[1];
            if(hourLeft.length === 1){
                return "0" + hourLeft + ":" + hourRight;
            }else{
                return hour;
            }
        }


        let course = this.props.dataSource[index];

        return (
            <Ons.ListItem key={index} onClick={this.props.handleOnClick.bind(this.props.parent, index)} tappable>
                <div className="left" style={{marginRight: "16px"}}>
                    {getHour(course.startHour) + " - " + getHour(course.endHour)}
                </div>
                <div className='center' style={{marginLeft: "16px"}}>

                    {course.name}
                </div>
                <div className="right">
                    {course.room}
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