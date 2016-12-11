import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');



import CoursesList from './CoursesList'

var LoginPage = observer(React.createClass({
    renderToolbar: function(){
        return (
            <Ons.Toolbar>
                <div className='center'>Autogestione Avogadro</div>
            </Ons.Toolbar>
        );
    },

    handleSignIn: function(navigator) {
        navigator.login("id")
    },
    
    handleSignUp: function(navigator){
        navigator.beginSignUp();
    },
    
    renderBottomToolbar: function(){
        return(<span></span>)
    },
    handlePasswordChange:function(){},
    handleUsernameChange: function(){},

    render: function() {
        var navigator = this.props.navigator;
        return (
            <Ons.Page renderToolbar={this.renderToolbar} renderBottomToolbar={this.renderBottomToolbar}>
                <Ons.Row verticalAlign="center"><Ons.Col>
                    <section style={{transform: 'translateY(150%)', textAlign: 'center'}}>
                        <p>
                            <Ons.Input
                                onChange={this.handleUsernameChange}
                                modifier='underbar'
                                float
                                placeholder='Nome utente' />
                        </p>
                        <p>
                            <Ons.Input
                                onChange={this.handlePasswordChange}
                                modifier='underbar'
                                type='password'
                                float
                                placeholder='Password' />
                        </p>
                        <p>
                            <Ons.Button modifier='quiet' onClick={this.handleSignIn.bind(this, navigator)} style={{marginRight: '4px'}}>Accedi</Ons.Button>
                            <Ons.Button modifier='quiet' onClick={this.handleSignUp.bind(this, navigator)} style={{marginLeft: '4px'}}>Registrati</Ons.Button>
                        </p>
                    </section></Ons.Col></Ons.Row>

            </Ons.Page>
        );
    }
}));


export default LoginPage;
