import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';
import CoursesPageContainer from './CoursesPageContainer'

var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');



var CoursesListPage = React.createClass({
    getInitialState: function() {
        return {
            index: 1
        }
    },
    renderTabs: function() {
        return [
            {
                content: <CoursesPageContainer manager={this.props.manager.buildListManager(1)} type={1}/>,
                tab: <Ons.Tab label='Corsi Da Seguire' icon='md-settings' />
            },
            {
                content: <CoursesPageContainer manager={this.props.manager.buildListManager(0)} type={0}/>,
                tab: <Ons.Tab label='Corsi Disponibili' icon='md-home' />
            },
            {
                content: <CoursesPageContainer manager={this.props.manager.buildListManager(2)} type={2}/>,
                tab: <Ons.Tab label='Corsi Da Gestire' icon='md-settings' />
            }
        ];
    },

    render: function() {
        let manager = this.props.manager;

        // manager.setCoursesToDisplay(manager.AVAILABLE)

        return (
            <Ons.Tabbar
                index={this.state.index}
                onPreChange={(event) =>
                {
                    if (event.index != this.state.index) {
                        console.log("new index: " + event.index)
                        this.setState({index: event.index});
                    }
                }
                }
                renderTabs={this.renderTabs}
            />
        );
    }
});


export default CoursesListPage;
