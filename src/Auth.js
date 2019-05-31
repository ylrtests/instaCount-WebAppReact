
class Auth {

     //Define variable y comienza con false por defecto.
    constructor (){
        this.authenticated = false
    }

    
    setAuth(isAuth){
        this.authenticated = isAuth
    }

    login(cb){
        this.authenticated = true
        cb()
    }
    
    logout(){
        this.authenticated = false
    }

    me(){

    }

    isAuthenticated(){
        return this.authenticated
    }



    
}

export default new Auth()