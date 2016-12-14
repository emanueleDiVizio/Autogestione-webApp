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


let serverApi = new ServerApi();

class CourseDetailManager {
	constructor(courseObj, navigator, api) {
		extendObservable(this, {
			course: {},
			
			displayCourse: action(function () {
				console.log(courseObj)
				this.course = courseObj;
			}),
			
			get courseToDisplay(){
				return {
					description: this.course.description,
					time: this.course.startHour + " - " + this.course.endHour,
					room: this.course.room,
					host: (this.course.hosts != null) ? this.course.hosts.map(function (host) {
						return host.name + " " + host.surname
					}).reduce(function (a, b) {
						return a + ", " + b;
					}, "") : []
				}
			},
			
			get title(){
				return this.course.name;
			},
			
			goBack: action(function(){
				navigator.goBack()
			}),
			
			join: action(function(){
				api.joinCourse(this.course.id)
			})
		})
	}
	
	
}


class CoursesListManager {
	constructor(appState, navigator) {
		extendObservable(this, {
			data: [],
			
			displayCoursesToJoin: action(function(index){
				var parent = this;
				serverApi.userApi().coursesToJoin().then(function(courses){
					console.log(courses)
					parent.data = courses;
				})
			}),
			
			select: action(function (index) {
				console.log("index: " + index)
				navigator.goToCoursePage(index, this.data[index].id, this.data[index].name, this.data[index])
			}),
			
			get dataNames() {
				var objs = this.data.map(item => item.name);
				return (objs)
			}
		})
	}
}

class SignUpManager {
	constructor() {
		extendObservable(this, {
			user: {
				name: "",
				surname: "",
				class: "",
				email: "",
				password: ""
			},
			
			signup: action(function (cb) {
				serverApi.userApi().signUpUser(this.user).then(function (json) {
					cb(json)
				});
			})
		})
	}
	
}

class LoginManager {
	constructor() {
		extendObservable(this, {
			user: {
				email: "",
				password: ""
			},
			
			setUserName: action(function (name) {
				this.user.email = name;
			}),
			
			setPassword: action(function (password) {
				this.user.password = password;
			}),
			
			login: action(function (cb) {
				serverApi.userApi().signInUser(this.user).then(function (json) {
					cb(json);
				});
			})
		})
	}
}


class AppNavigator {
	constructor(appState, navigator) {
		this.appState = appState;
		this.navigator = navigator;
	}
	
	goToCoursePage(index, id, title, course) {
		console.log("course")
		this.appState.pages.push({name: 'course', index: index, id: id, course: course});
		this.navigator.pushPage({title: title, hasBackButton: true, course: course})
		
		
	}
	
	goToCoursesPage() {
		this.appState.pages.push({name: 'courses'});
		this.navigator.pushPage({title: 'courses', hasBackButton: false})
	}
	
	goBack() {
		console.log("goback")
		this.appState.goBack();
		this.navigator.popPage();
	}
	
	login(id) {
		this.goToCoursesPage();
	}
	
	signUp() {
		this.goToCoursesPage();
	}
	
	beginSignUp() {
		this.appState.pages.push({name: 'signUp'});
		this.navigator.pushPage({title: 'signUp', hasBackButton: true})
	}
}

class AppState {
	constructor() {
		extendObservable(this, {
			pages: [{name: 'main'}],
			
			get lastPage() {
				return (this.pages.slice(-1)[0])
			},
			
			goBack: action(function () {
				this.pages.pop();
			}),
			
			
		})
	}
	
	pageToDisplay(route, navigator) {
		var nav = new AppNavigator(this, navigator)
		var lastPage = this.lastPage;
		if (lastPage.name === 'main') {
			var loginManager = new LoginManager()
			return (<LoginPage key={route.title} navigator={nav} manager={loginManager}></LoginPage>)
		}
		else if (lastPage.name === 'signUp') {
			var signupManager = new SignUpManager()
			return (<SignUpPage key={route.title} navigator={nav} manager={signupManager}></SignUpPage>)
			
		}
		else if (lastPage.name === 'courses') {
			var manager = new CoursesListManager(this, nav);
			return (<CoursesPage key={route.title} route={route} navigator={nav} manager={manager}/>)
		}
		else if (lastPage.name === 'course') {
			var courseDetailManager = new CourseDetailManager(lastPage.course, nav, serverApi.userApi());
			return (<CourseDetailPage key={route.title} manager={courseDetailManager}></CourseDetailPage>);
		}
	}
	
	
}


var state = new AppState()

ons.ready(function () {
	ReactDOM.render(
		<AppContainer stateManager={state}/>,
		document.getElementById('root')
	);
});

