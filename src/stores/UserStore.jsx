import {extendObservable, action} from "mobx";
var _ = require('lodash')

class UserApi {
	constructor(serverApi) {
		this.serverApi = serverApi;
	}
	
	signInUser(user) {
		var scope = this;
		return this.serverApi.userApi().signInUser(user).then(function (json) {
			scope.currentUser = json.user;
			return json;
		})
	}
	
	signupUser(user) {
		var scope = this;
		return this.serverApi.userApi().signUpUser(user).then(function (json) {
			console.log(json.user)
			scope.currentUser = json.user;
			return json;
		});
	}
	
	userCoursesApi(){
		return new UserCoursesApi(this.serverApi, this.currentUser, {coursesToJoin: [], joinedCourses: [], hostedCourses:[]})
	}
}


class UserCoursesApi {
	constructor(serverApi, user, coursesCache) {
		this.user = user;
		this.userApi = serverApi.userApi();
		this.coursesCache = coursesCache;
	}
	
	joinCourse(id) {
		return this.userApi.joinCourse(id, this.user.id)
	}
	
	coursesToJoin() {
		var self = this;
		return Promise.resolve(this.coursesCache.coursesToJoin).then(function(courses){
			console.log("CACHE: " + courses)
			if(courses.length === 0){
				return self.userApi.coursesToJoin(self.user.id).then(function(courses){
					self.coursesCache.coursesToJoin = courses;
					return Promise.resolve(self.coursesCache.coursesToJoin)
				})
			}
		})
	}
	
	checkAttendee(courseId, userId){
		return this.userApi.checkAttendee(courseId, userId)
	}
	
	coursesToHost() {
		return this.userApi.coursesToHost(this.user.id);
	}
	
	joinedCourses() {
		var self = this;
		return Promise.resolve(this.coursesCache.joinedCourses).then(function(courses){
			console.log("CACHE: " + courses)
			if(courses.length === 0){
				return self.userApi.joinedCourses(self.user.id).then(function(courses){
					self.coursesCache.joinedCourses = courses;
					return Promise.resolve(self.coursesCache.joinedCourses)
				})
			}
		})
	}
	
	hostedCourses() {
		var self = this;
		return Promise.resolve(this.coursesCache.hostedCourses).then(function(courses){
			console.log("CACHE: " + courses)
			if(courses.length === 0){
				return self.userApi.hostedCourses(self.user.id).then(function(courses){
					self.coursesCache.hostedCourses = courses;
					return Promise.resolve(self.coursesCache.hostedCourses)
				})
			}
		})
	}
	
	isHost(course){
		var self = this;
		return _.some(course.hosts, function(host){
			return host.id === self.user.id;
		})
	}
	
	
}

export default UserApi;
