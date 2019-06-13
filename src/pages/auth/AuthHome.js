import React from "react"
import Header from "../../components/Header"

class AuthHome extends React.Component {

    render() {
        return (
            <div>
                <Header pathname={this.props.location.pathname}/>
                <h1>Home logged</h1>
            </div>
        )
    }
}

export default AuthHome