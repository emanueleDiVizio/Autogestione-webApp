import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');


var AppContainer = observer(React.createClass({
    renderToolbar: function(route, navigator) {
        const backButton = route.hasBackButton
        ? <Ons.BackButton onClick={this.handleClick.bind(this, navigator)}>Back</Ons.BackButton>
              : null;

        return (
            <Ons.Toolbar>
                <div className='left'>{backButton}</div>
                <div className='center'>{route.title}</div>
            </Ons.Toolbar>
        );
    },

    handleClick: function(navigator) {
        ons.notification.confirm('Do you really want to go back?')
            .then((response) => {
            if (response === 1) {
                navigator.popPage();
                this.props.stateManager.goBack();
            }
        });
    },

    renderPage: function(route, navigator) {
        return (
            <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
                {this.props.stateManager.pageToDisplay(navigator)}
            </Ons.Page>
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
}));


export default AppContainer;
