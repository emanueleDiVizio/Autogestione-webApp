import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';
import './index.css';
import '../node_modules/onsenui/css/onsenui.css';
import '../node_modules/onsenui/css/onsen-css-components.css';

var ons = require('onsenui');
var Ons = require('react-onsenui');


import CourseDetailPage from './components/CourseDetailPage';
import CoursesPage from './components/CoursesPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ServerApi from './api'


import {extendObservable, action, autorun} from 'mobx';

class ListManager {
    constructor(appState, navigator) {
        extendObservable(this, {
            data: [{title: "Corso di programmazione", id: "poppe"}, {title: "Corso di programmazione", id: "poppe"}, {title: "Corso di programmazione", id: "poppe"}, {title: "Corso di programmazione", id: "poppe"}, {title: "Corso di programmazione", id: "poppe"}],

            select: action(function(index) {
                navigator.goToCoursePage(index, this.data[index].id, this.data[index].title)
            }),

            get dataNames(){
                var objs = this.data.map(item => item.title);
                return(objs)
            }
        })
    }
}

class LoginManager {
    constructor(){
        extendObservable(this, {
            name: "",
            password: "",

            setUserName: action(function(name){
                this.name = name;
            }),

            setPassword: action(function(password){
                this.password = password;
            }),

            login: action(function(cb){
                new ServerApi(true).signInUser({email: this.name, password: this.password}).then(function(response){
                    console.log(response);
                    cb();
                });
            })
        })
    }
}

class AppNavigator{
    constructor(appState, navigator){
        this.appState = appState;
        this.navigator = navigator;
    }

    goToCoursePage(index, id, title){
        console.log("course")
        this.appState.pages.push({name: 'course', index: index, id: id});
        this.navigator.pushPage({title: title, hasBackButton: true})


    }

    goToCoursesPage(){
        this.appState.pages.push({name: 'courses'});
        this.navigator.pushPage({title: 'courses', hasBackButton: false})
    }

    goBack(){
        console.log("goback")
        this.appState.goBack();
        this.navigator.popPage();
    }

    login(id){
        this.goToCoursesPage();
    }

    signUp(){
        this.goToCoursesPage();
    }

    beginSignUp(){
        this.appState.pages.push({name: 'signUp'});
        this.navigator.pushPage({title: 'signUp', hasBackButton: true})
    }
}

class AppState {
    constructor(){
        extendObservable(this, {
            pages: [{name: 'main'}],

            get lastPage(){
                return(this.pages.slice(-1)[0])
            },

            goBack: action(function(){
                this.pages.pop();
            }),


        })
    }
    pageToDisplay(route, navigator) {
        var nav = new AppNavigator(this, navigator)
        var manager = new LoginManager()
        if(this.lastPage.name === 'main'){
            return(<LoginPage key={route.title} navigator={nav} manager={manager}></LoginPage>)
        }
        else if(this.lastPage.name === 'signUp'){
            return(<SignUpPage key={route.title} navigator={nav}></SignUpPage>)

        }      
        else if(this.lastPage.name === 'courses'){
            var manager = new ListManager(this, nav);
            return(<CoursesPage key={route.title} route={route} navigator={nav} manager={manager}/>)
        }
        else if(this.lastPage.name === 'course'){
            return(<CourseDetailPage key={route.title} route={route} navigator={nav} onBack={this.goBack.bind(this)}></CourseDetailPage>);
        }
    }


}


var state = new AppState()

ons.ready(function() {
    ReactDOM.render(
        <AppContainer stateManager={state}/>,
        document.getElementById('root')
    );
});

