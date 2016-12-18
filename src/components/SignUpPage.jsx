import React, { Component } from 'react';
import {observable} from 'mobx';
import {action, autorun} from 'mobx';
import {observer} from 'mobx-react';


var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');


var SignUpPage = observer(React.createClass({
	
	getInitialState: function(){
		return {
			building: "Centrale"
		}
	},
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

    handleSignUp: function(manager, navigator){
        manager.signup(function(res){
            if(res.success){
                navigator.login(res.user.id)
            }else{
                ons.notification.alert({message: "Nome utente o password errati.", title: "Attenzione!"})
            }
        })
    },

    handleNameChange: function(manager, e){
        manager.user.name = e.target.value;
    },
    handleSurnameChange: function(manager, e){
        manager.user.surname = e.target.value;
    },
    handleClassChange: function(manager, e){
        manager.user.class = e.target.value;
    },
    handleEmailChange: function(manager, e){
        manager.user.email = e.target.value;
    },
    handlePasswordChange: function(manager, e){
        manager.user.password = e.target.value;
    },
	handleBuildingChange: function(building){
    	this.setState({building: building})
		this.props.manager.user.building = building;
	},
	
	renderRadioRow(row) {
		return (
			<Ons.ListItem key={row} tappable>
				<label className='left'>
					<Ons.Input
						inputId={`radio-${row}`}
						checked={row === this.state.building}
						onChange={this.handleBuildingChange.bind(this, row)}
						type='radio'
					/>
				</label>
				<label htmlFor={`radio-${row}`} className='center'>
					{row}
				</label>
			</Ons.ListItem>
		)
	},
	
    render: function() {
        var navigator = this.props.navigator;
        var manager = this.props.manager;
        return (
            <Ons.Page renderToolbar={this.renderToolbar}>
                <Ons.Row verticalAlign="center"><Ons.Col>
                    <section style={{transform: 'translateY(25%)', textAlign: 'center'}}>
                        <p>
                            <Ons.Input
                                onChange={this.handleNameChange.bind(this, manager)}
                                modifier='underbar'
                                float
                                placeholder='Nome' />
                        </p>
                        <p>
                            <Ons.Input
                                onChange={this.handleSurnameChange.bind(this, manager)}
                                modifier='underbar'
                                float
                                placeholder='Cognome' />
                        </p>
                        <p>
                            <Ons.Input
                                onChange={this.handleClassChange.bind(this, manager)}
                                modifier='underbar'
                                float
                                placeholder='Classe' />
                        </p>
                        <p>
                            <Ons.Input
                                onChange={this.handleEmailChange.bind(this, manager)}
                                modifier='underbar'
                                float
                                placeholder='E-Mail' />
                        </p>
                        <p>
                            <Ons.Input
                                onChange={this.handlePasswordChange.bind(this, manager)}
                                modifier='underbar'
                                type='password'
                                float
                                placeholder='Password' />
                        </p>
						<Ons.List
							dataSource={["Centrale", "Succursale"]}
							renderHeader={() => <Ons.ListHeader>Sede</Ons.ListHeader>}
							renderRow={this.renderRadioRow}
						/>
                        <p>
                            <Ons.Button modifier='quiet' onClick={this.handleSignUp.bind(this, manager,  navigator)} style={{marginLeft: '4px'}}>Registrati</Ons.Button>
                        </p>
                    </section></Ons.Col></Ons.Row>

            </Ons.Page>
        );
    }
}));


export default SignUpPage;
