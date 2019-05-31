import React from "react"
import {Route, Redirect} from "react-router-dom"
import auth from "../Auth"
 
const AuthRoute = ({component: Component, ...rest}) => {
    console.log("authRoute")
    return(
        <Route {...rest} render={ (props) => {
            if(auth.isAuthenticated()){
                return <Component {...props} />
            }
            else{
                return <div>No está autenticado</div>
            }
        }}/>
    )
}

export default AuthRoute 