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

    handleSignIn: function(navigator, manager) {
        manager.login(function(res){
            if(res.success){
                navigator.login(res.user.id)
            }else{
                ons.notification.alert({message: "Nome utente o password errati.", title: "Attenzione!"})
            }
        })
    },

    handleSignUp: function(navigator){
        navigator.beginSignUp();
    },

    renderBottomToolbar: function(){
        return(<span></span>)
    },
    handlePasswordChange:function(manager, e){
        manager.setPassword(e.target.value)
    },
    handleUsernameChange: function(manager, e){
        manager.setUserName(e.target.value)
    },

    render: function() {
        var navigator = this.props.navigator;
        var manager = this.props.manager;
        return (
            <Ons.Page renderToolbar={this.renderToolbar} renderBottomToolbar={this.renderBottomToolbar}
					  >
                <Ons.Row verticalAlign="center"><Ons.Col>
                    <section style={{transform: 'translateY(150%)', textAlign: 'center'}}>
                        <p>
                            <Ons.Input
                                onChange={this.handleUsernameChange.bind(this, manager)}
                                modifier='underbar'
                                float
                                placeholder='Indirizzo email' />
                        </p>
                        <p>
                            <Ons.Input
                                onChange={this.handlePasswordChange.bind(this, manager)}
                                modifier='underbar'
                                type='password'
                                float
                                placeholder='Password' />
                        </p>
                        <p>
                            <Ons.Button modifier='quiet' onClick={this.handleSignIn.bind(this, navigator, manager)} style={{marginRight: '4px'}}>Accedi</Ons.Button>
                            <Ons.Button modifier='quiet' onClick={this.handleSignUp.bind(this, navigator)} style={{marginLeft: '4px'}}>Registrati</Ons.Button>
                        </p>
						<p>
							{manager.isLoading ? <Ons.ProgressCircular indeterminate/>
								: <div></div>
							}
						</p>
                    </section></Ons.Col></Ons.Row>

            </Ons.Page>
        );
    }
}));


export default LoginPage;
