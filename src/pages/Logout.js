import React from "react"
import auth from "../Auth"
import LoadingIcon from "../components/LoadingIcon"

class Logout extends React.Component {

    componentDidMount() {
      auth.logout()
      this.props.history.push("/")
      this.props.history.go("/")
    }
  
    render() {
      return (
        <div className="container-fluid full-vph">
          <LoadingIcon type="ellipsis" />
        </div>
      )
    }
  }

  export default Logout