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
		return new UserCoursesApi(this.serverApi, this.currentUser)
	}
}


class UserCoursesApi {
	constructor(serverApi, user) {
		this.user = user;
		this.userApi = serverApi.userApi();
	}
	
	joinCourse(id) {
		return this.userApi.joinCourse(id, this.user.id)
	}
	
	coursesToJoin() {
		return this.userApi.coursesToJoin(this.user.id);
	}
	
	checkAttendee(courseId, userId){
		return this.userApi.checkAttendee(courseId, userId)
	}
	
	coursesToHost() {
		return this.userApi.coursesToHost(this.user.id);
	}
	
	joinedCourses() {
		return this.userApi.joinedCourses(this.user.id);
	}
	
	hostedCourses() {
		return this.userApi.hostedCourses(this.user.id);
	}
	
	isHost(course){
		var self = this;
		return _.some(course.hosts, function(host){
			return host.id === self.user.id;
		})
	}
	
	
}

export default UserApi;
