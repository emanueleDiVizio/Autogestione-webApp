class ServerApi {
    constructor(){
    	var isProduction = false;
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
				class: user.class,
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
	
	coursesToJoin(){
		return(fetch(this.url + "/availableCoursesToJoin")).then(extractCoursesFromResponse)
	}
	
	coursesToHost(){
		return(fetch(this.url + "/availableCoursesToHost")).then(extractCoursesFromResponse)
	}
	
	joinedCourses(){
		return fetch(this.url + "/joinedCourses").then(extractCoursesFromResponse)
	}
	
	hostedCourses(){
		return fetch(this.url + "/hostedCourses").then(extractCoursesFromResponse)
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