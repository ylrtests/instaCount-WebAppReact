import React from "react"
import Header from "../../../components/Header"
import TableFans from "./components/TableFans"
import { Route } from "react-router-dom"
import FansPosts from "./FansPosts"
import DeleteFans from "./components/DeleteFans"



class Fans extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <h1>Fans</h1>
                    <TableFans />
                    <DeleteFans history={this.props.history}/>
                   
                    <Route exact path="/fans/:id" component={FansPosts} />
                </div>
            </div>
        )
    }
}

export default Fans