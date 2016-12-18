class ServerApi {
    constructor(){
    	var isProduction = true;
        this.url = isProduction ? 'https://autogestione-server.herokuapp.com/' : 'http://localhost:1337/';

    }

    userApi(){
    	return new UserApi(this.url)
	}

}


class UserApi {
	constructor(url){
		this.url = url + "user"
	}

	signUpUser(user){
		return(fetch(this.url + '/signup', {
			method: 'post',
			mode: 'no-cors',
			body: JSON.stringify({
				name: user.name + " " + user.surname,
				year: user.year,
				section: "",
				building: user.building,
				email: user.email,
				password:user.password
			})
		})).then(responseToJson)
	}

	signInUser(user){
		console.log(user)
		return(fetch(this.url + '/login', {
			method: 'post',
			mode: 'no-cors',
			body: JSON.stringify({
				email: user.email,
				password:user.password
			})
		})).then(responseToJson)
	}
	joinCourse(courseId, userId){
		return fetch(this.url + "/joinCourse", {
            method: 'post',
			mode: 'no-cors',
			body: JSON.stringify({
				courseId: courseId,
				userId: userId
			})
		}).then(responseToJson)
	}

	checkAttendee(courseId, userId){
		return(fetch(this.url + "/confirmAttendee", {
			method: 'post',
			mode: 'no-cors',
			body: JSON.stringify({
				userId: userId,
				courseId: courseId
			})
		})).then(extractCoursesFromResponse)
	}
	coursesToJoin(userId){
		return(fetch(this.url + "/availableCoursesToJoin", {
			method: 'post',
			body: JSON.stringify({
				userId: userId
			})
        })).then(extractCoursesFromResponse)
	}

	coursesToHost(userId){
		return(fetch(this.url + "/availableCoursesToHost", {
			method: 'post',
			body: JSON.stringify({
				userId: userId
			})
		})).then(extractCoursesFromResponse)
	}

	joinedCourses(userId){
		return fetch(this.url + "/joinedCourses", {
			method: 'post',
			body: JSON.stringify({
				userId: userId
			})
		}).then(extractCoursesFromResponse)
	}

	hostedCourses(userId){
		return fetch(this.url + "/hostedCourses", {
			method: 'post',
			body: JSON.stringify({
				userId: userId
			})
		}).then(extractCoursesFromResponse)
	}
}


var responseToJson = function(response){
	return response.json();
};

function extractCoursesFromResponse(response){
	return responseToJson(response).then(function(json){
		return Promise.resolve(json.courses)
	});
}
export default ServerApi;
