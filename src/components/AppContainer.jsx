import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');


var AppContainer = React.createClass({
    renderPage: function(route, navigator) {
        return (
            this.props.stateManager.pageToDisplay(route, navigator)

        );
    },

    render: function() {
        return (
            <Ons.Navigator
                renderPage={this.renderPage}
                initialRoute={{
                    title: 'Corsi',
                        hasBackButton: false
                }}
                />
        );
    }
});


export default AppContainer;
