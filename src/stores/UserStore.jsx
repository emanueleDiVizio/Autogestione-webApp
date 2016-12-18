import {extendObservable, action} from "mobx";
var _ = require('lodash')

class UserApi {
	constructor(serverApi) {
		this.serverApi = serverApi;
	}
	
	signInUser(user) {
		var scope = this;
		return this.serverApi.userApi().signInUser(user).then(function (json) {
			console.log("signin: " + json.toString())
			scope.currentUser = json.user;
			return json;
		})
	}
	
	signupUser(user) {
		var scope = this;
		return this.serverApi.userApi().signUpUser(user).then(function (json) {
			console.log(json)
			scope.currentUser = json.user;
			return json;
		});
	}
	
	userCoursesApi(){
		return new UserCoursesApi(this.serverApi, this.currentUser, {coursesToJoin: [], joinedCourses: [], hostedCourses:[], areJoinedCached: false, areHostedCached: false, areToJoinCached: false})
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
			console.log("CACHE: " + self.coursesCache.areToJoinCached)
			if(!self.coursesCache.areToJoinCached){
				return self.userApi.coursesToJoin(self.user.id).then(function(courses){
					self.coursesCache.coursesToJoin = courses;
					self.coursesCache.areToJoinCached = true;
					return Promise.resolve(self.coursesCache.coursesToJoin)
				})
			}else{
				return courses;
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
			console.log("CACHE: " + self.coursesCache.areJoinedCached)
			if(!self.coursesCache.areJoinedCached){
				return self.userApi.joinedCourses(self.user.id).then(function(courses){
					self.coursesCache.joinedCourses = courses;
					self.coursesCache.areJoinedCached = true;
					
					return Promise.resolve(self.coursesCache.joinedCourses)
				})
			}else{
				return courses;
			}
		})
	}
	
	hostedCourses() {
		var self = this;
		return Promise.resolve(this.coursesCache.hostedCourses).then(function(courses){
			console.log("CACHE: " + self.coursesCache.areHostedCached)
			if(!self.coursesCache.areHostedCached){
				return self.userApi.hostedCourses(self.user.id).then(function(courses){
					self.coursesCache.hostedCourses = courses;
					self.coursesCache.areHostedCached = true;
					
					return Promise.resolve(self.coursesCache.hostedCourses)
				})
			}else{
				return courses;
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
