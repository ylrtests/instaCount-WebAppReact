import React from "react"
import {Route} from "react-router-dom"
import auth from "../Auth"
 
const AuthRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render={ (props) => {
            if(auth.isAuthenticated()){
                return <Component {...props} />
            }
            else{
                auth.logout()
                return <div>No está autenticado</div>
                        //this.props.history.go('/')
            }
        }}/>
    )
}

export default AuthRoute 