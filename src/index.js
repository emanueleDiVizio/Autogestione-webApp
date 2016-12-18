import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';
import './index.css';
import '../node_modules/onsenui/css/onsenui.css';
import '../node_modules/onsenui/css/onsen-css-components.css';

var ons = require('onsenui');
var Ons = require('react-onsenui');


import CourseDetailPage from './components/CourseDetailPage';
import CoursesListPage from './components/CoursesListPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ServerApi from './api'
import UserApi from './stores/UserStore'

import {extendObservable, action, autorun, toJS} from 'mobx';


var _ = require('lodash')
let serverApi = new ServerApi();

class CourseDetailManager {
	constructor(courseObj, navigator, api) {
		extendObservable(this, {
			course: courseObj,

			displayCourse: action(function () {
				console.log(courseObj)
			}),

			get courseToDisplay(){
				// console.log("attendees : " + this.course.hosts.slice())
				// console.log(this.course.hosts[0])
				return {
					description: this.course.description,
					time: this.course.startHour + " - " + this.course.endHour,
					room: this.course.room,
					host: (this.course.hosts != null && this.course.hosts.slice().length !== 0) ? this.course.hosts.map(function (host) {
						return host.name
					}).reduce(function (a, b) {
						return a + ", " + b;
					}) : []
				}
			},

			get courseAttendees(){
			    console.log(this.course)
				return this.course.attendees;
			},

			checkAttendee: action(function(index){
				let attendee = this.course.attendees[index];
				api.checkAttendee(this.course.id, attendee.id)
			}),
			
			isAttendeeConfirmed(attendee){
				return _.some(this.course.confirmedAttendees, function(cattendee){
					return cattendee.id === attendee.id
				});
			},
			
			get isHost(){
				return api.isHost(this.course)
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
	constructor(appState, navigator, userCoursesApi) {

        this.AVAILABLE = 0;
        this.JOINED = 1;
        this.HOSTED = 2;
		extendObservable(this, {
			data: [],

			type: this.AVAILABLE,

			displayCourses: action(function(index){
				if(this.data.slice().length === 0){
					var scope =this;
                    userCoursesApi.coursesToJoin().then(function(courses){
                        console.log(courses)
                        scope.data = courses;
                    })
				}
			}),

			goBack: action(function(){
                appState.goBack();
			}),

			select: action(function (index) {
				console.log("index: " + index)
				navigator.goToCoursePage(index, this.data[index].id, this.data[index].name, this.data[index])
			}),

			setCoursesToDisplay: action(function(type){
                var parent = this;
					switch(type){
                        case this.AVAILABLE:
                            userCoursesApi.coursesToJoin().then(function(courses){
                                console.log(courses)
                                parent.data = courses;
                            })
                            break;
                        case this.JOINED:
                            userCoursesApi.joinedCourses().then(function(courses){
                                console.log(courses)
                                parent.data = courses;
                            })
                            break;
                        case this.HOSTED:
                            userCoursesApi.hostedCourses().then(function(courses){
                                console.log(courses)
                                parent.data = courses;
                            })
                            break;
                    }
			}
			),

			get dataNames() {
				var objs = this.data.map(item => item.name);
				return (objs)
			}
		})
	}
}


class CoursesPageManager {
    constructor(appState, navigator, userApi){
        this.appState = appState;
        this.navigator = navigator;
        this.userApi = userApi;
    }

    buildListManager(type){
        let coursesListManager = new CoursesListManager(this.appState, this.navigator, this.userApi);
        coursesListManager.setCoursesToDisplay(type)
        return coursesListManager;
    }
}

class SignUpManager {
	constructor(userApi) {
		extendObservable(this, {
			user: {
				name: "",
				surname: "",
				class: "",
				email: "",
				password: "",
				building: "Centrale"
			},

			signup: action(function (cb) {
				userApi.signupUser(this.user).then(function (json) {
					cb(json)
				});
			})
		})
	}

}

class LoginManager {
	constructor(userApi) {
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
				userApi.signInUser(this.user).then(function (json) {
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
		this.userApi = new UserApi(new ServerApi());
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
			var loginManager = new LoginManager(this.userApi)
			return (<LoginPage key={route.title} navigator={nav} manager={loginManager}></LoginPage>)
		}
		else if (lastPage.name === 'signUp') {
			var signupManager = new SignUpManager(this.userApi)
			return (<SignUpPage key={route.title} navigator={nav} manager={signupManager}></SignUpPage>)

		}
		else if (lastPage.name === 'courses') {
			var manager = new CoursesPageManager(this, nav, this.userApi.userCoursesApi())
			return (<CoursesListPage key={route.title} route={route} manager={manager}/>)
		}
		else if (lastPage.name === 'course') {
			var courseDetailManager = new CourseDetailManager(lastPage.course, nav, this.userApi.userCoursesApi());
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

