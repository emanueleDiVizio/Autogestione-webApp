import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');


var SignUpPage = observer(React.createClass({
    renderToolbar: function(){
        return (
            <Ons.Toolbar>
                <div className='left'><Ons.BackButton onClick={this.handleBack.bind(this, this.props.navigator)}>Indietro</Ons.BackButton>
                </div>
                <div className='center'>Registrazione</div>
            </Ons.Toolbar>
        );
    },

    handleBack: function(navigator) {
        navigator.goBack();
    },

    handleSignUp: function(navigator){
        navigator.signUp();
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
                    <section style={{transform: 'translateY(50%)', textAlign: 'center'}}>
                        <p>
                            <Ons.Input
                                onChange={this.handleUsernameChange}
                                modifier='underbar'
                                float
                                placeholder='Nome' />
                        </p>
                        <p>
                            <Ons.Input
                                onChange={this.handleUsernameChange}
                                modifier='underbar'
                                float
                                placeholder='Cognome' />
                        </p>
                        <p>
                            <Ons.Input
                                onChange={this.handleUsernameChange}
                                modifier='underbar'
                                float
                                placeholder='Classe' />
                        </p>
                        <p>
                            <Ons.Input
                                onChange={this.handleUsernameChange}
                                modifier='underbar'
                                float
                                placeholder='E-Mail' />
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
                            <Ons.Button modifier='quiet' onClick={this.handleSignUp.bind(this, navigator)} style={{marginLeft: '4px'}}>Registrati</Ons.Button>
                        </p>
                    </section></Ons.Col></Ons.Row>

            </Ons.Page>
        );
    }
}));


export default SignUpPage;
