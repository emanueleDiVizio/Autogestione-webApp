import React, { Component } from 'react';

import styles from '../styles'
import {observer} from 'mobx-react';
var ons = require('onsenui');
var Ons = require('react-onsenui');


const CourseDetail = observer(React.createClass({
    render: function(){
        var course = this.props.course
        
        
        return(
            <div>
            <div style={styles.textPage}>
                {course.description} <br/><br/>
                <b>Orario: </b>{course.time} <br/><b>Aula: </b> {course.room} <br/><b>Responsabile: </b> {course.host}<br></br>
            </div>
            </div>
        )
    }
}))

export default CourseDetail;