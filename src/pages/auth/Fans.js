import React from "react"
import Header from "../../components/Header"
import TableFans from "./TableFans"

class Fans extends React.Component{

    render(){
        return(
            <div>
                <Header />
                <div className="container-fluid">
                    <h1>Fans</h1>
                    <TableFans />
                </div>
            </div>
        )
    }
}

export default Fans