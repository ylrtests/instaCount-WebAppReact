import React from "react"
import { Route } from "react-router-dom"
import auth from "../Auth"
import LoadingIcon from "./LoadingIcon"

const AuthRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            if (auth.isAuthenticated()) {
                return <Component {...props} />
            }
            else {
                auth.logout()
                return (
                    <div className="container-fluid full-vph">
                        <LoadingIcon type="ellipsis" />
                    </div>
                )
            }
        }} />
    )
}

export default AuthRoute 