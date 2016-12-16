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
            body: JSON.stringify({
				name: user.name,
				surname: user.surname,
				year: "",
				section: "",
				building: "",
				email: user.email,
				password:user.password
			})
		})).then(responseToJson)
	}

	signInUser(user){
		console.log(user)
		return(fetch(this.url + '/login', {
			method: 'post',
            body: JSON.stringify({
				email: user.email,
				password:user.password
			})
		})).then(responseToJson)
	}
	joinCourse(id){
		return fetch(this.url + "/joinCourse", {
            credentials: 'include',
            method: 'post',
			body: JSON.stringify({
				courseId: id
			})
		}).then(responseToJson)
	}

	checkAttendee(id){
		console.log(id)
	}
	coursesToJoin(){
		return(fetch(this.url + "/availableCoursesToJoin", {
            credentials: 'include'
        })).then(extractCoursesFromResponse)
	}

	coursesToHost(){
		return(fetch(this.url + "/availableCoursesToHost", {
            credentials: 'include'
        })).then(extractCoursesFromResponse)
	}

	joinedCourses(){
		return fetch(this.url + "/joinedCourses", {
            credentials: 'include'
        }).then(extractCoursesFromResponse)
	}

	hostedCourses(){
		return fetch(this.url + "/hostedCourses", {
            credentials: 'include'
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
