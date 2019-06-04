import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import auth from "./Auth"
import axios from "axios"
import { URL, getToken } from "./Helpers"

import AuthRoute from "./components/AuthRoute"
import LoadingIcon from "./components/LoadingIcon"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Home from "./pages/Home"
import AuthHome from "./pages/auth/AuthHome"
import Fans from "./pages/auth/Fans"
import Posts from "./pages/auth/Posts"
// import PageError from "./pages/PageError"


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    console.log("componentDidMount()")
    //Si existe token en localStorage, intenta obtener usuario.
    if (getToken()) {
      axios({
        method: "GET",
        url: URL + "/me?token=" + getToken()
      }).then((response) => {
        let data = response.data

        if (data.success) {
          //Al obtener respuesta positiva, auntentica el usuario.
          auth.setAuth(true)
          console.log(data.message)
          console.log(data.user)
          console.log("=============================")
          this.setState({ isLoading: false })
        }
        else {
          console.log(data.message)
          auth.setAuth(false)
          this.setState({ isLoading: false })
        }
      }).catch((error) => {
        console.log("Error auth")
        console.log(error)
        auth.setAuth(false)
        this.setState({ isLoading: false })
      })
    }
    else {
      console.log("No hay token...")
      auth.setAuth(false)
      this.setState({ isLoading: false })
    }
  }

  render() {

    if (this.state.isLoading) {
      console.log("esta cargando...")
      return (
        <div className="container-fluid full-vph">
          <LoadingIcon type="ellipsis" />
        </div>
      )
    }
    //Ya hay respuesta de axios para saber si el user está autenticado
    else {
      if (auth.isAuthenticated()) {
        return (
          <div>
            <BrowserRouter>
                {/* <AuthRoute path="/posts/:id_insta" exact component={PostDetails} />
                <Route path="/posts/:id_insta/*"  render={() => <Redirect to="/posts" />} /> */}
                
              <Switch>
                <AuthRoute path="/posts" component={Posts} />
                <AuthRoute path="/" exact component={AuthHome} />
                <AuthRoute path="/fans" exact component={Fans} />
                <Route path="/logout" exact component={Logout} />
                <Route render={() => <Redirect to="/" />} />
              </Switch>

            </BrowserRouter>
          </div>
        );
      }

      else {
        return (
          <div>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route render={() => <Redirect to="/login" />} />
              </Switch>
            </BrowserRouter>
          </div>
        )
      }

    }
  }

}


export default App
