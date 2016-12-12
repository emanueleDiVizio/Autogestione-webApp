class ServerApi {
    constructor(production){
        this.url = production ? 'https://autogestione-server.herokuapp.com/' : 'http://localhost:1337/';

    }
    
    signUpUser(user){
        return(fetch(this.url + 'user/signup', {
            method: 'post',
            body: JSON.stringify({
                name: user.name,
                surname: user.surname,
                class: user.class,
                email: user.email,
                password:user.password
            })
        }))
    }
    
    signInUser(user){
        console.log(user)
        return(fetch(this.url + 'user/login', {
            method: 'post',
            body: JSON.stringify({
                email: user.email,
                password:user.password
            })
        }))
    }
    
}

export default ServerApi;