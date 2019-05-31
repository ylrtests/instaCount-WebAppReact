import React from 'react';
import Login from "./components/Login"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import AuthRoute from "./components/AuthRoute"
// import TableFans from "./components/TableFans"
import auth from "./Auth"
import axios from "axios"
import { URL, getToken } from "./Helpers"


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
    //this.init()
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

  init() {

  }

  render() {

    if (this.state.isLoading) {
      return (
        <div>Cargando...</div>
      )
    }
    //Ya hay respuesta de axios para saber si el user está autenticado
    else {

      if (auth.isAuthenticated()) {
        return (
          <div>
            <BrowserRouter>
              <Switch>
                <AuthRoute path="/" exact component={() => (<div>Home log</div>)} />
                <AuthRoute path="/tabla" exact component={() => (<div>Tabla</div>)} />
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
                <Route path="/" exact component={() => (<div>Home</div>)} />
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
