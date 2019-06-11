import React from "react";
import { MDBDataTable } from 'mdbreact';
import axios from "axios"
import { URL, getToken } from "../../../../Helpers"
import { Route, Link } from "react-router-dom"

import FansPosts from "../FansPosts"

class TableFans extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Username',
                    field: 'username',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Posts-Count',
                    field: 'posts_count',
                    sort: 'asc'
                },
                {
                    label: 'URL',
                    field: 'url',
                    sort: 'asc'
                }
            ],
            fans: [

            ],
        }
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    handleButtonClick() {

        let formData = new FormData(document.getElementById('deleteFanForm'))
        console.log(formData)

    }


    componentDidMount() {
        this._mounted = true
        console.log("Se monto tabla...")

        axios({
            method: "GET",
            url: URL + "/fan",
            headers: {
                "Authorization": 'bearer ' + getToken(),
            }
        }).then((response) => {

            let datos = response.data;
            let newFans = datos.fans.map((row) => {
                let hrefURL = "/fans/" + row.id

                return ({
                    id: row.id,
                    username:<Link to={hrefURL}>{row.username}</Link>,
                    status: row.status,
                    posts_count: <Link to={hrefURL}>{row.posts_count}</Link>,
                    url: <a key={row.url} href={row.url} target="_blank" rel="noopener noreferrer">{row.url}</a>

                })
            })

            console.log(newFans)

            // this._mounted se usa para no alterar el state en caso de que
            // el componente se haya cerrado..
            if (datos.success && this._mounted) {
                this.setState({
                    fans: newFans,
                    data: {
                        columns: this.state.columns,
                        rows: newFans
                    }
                })
            }
            else {
                console.log("success falso");
            }
        })
    }


    render() {

        return (
            <div>
                <MDBDataTable
                    striped
                    bordered
                    data={this.state.data}
                />
                <div style={{ border: "2px outset whitesmoke", padding: "1em" }}>
                    <div className="row">
                        <div className="col">
                            <h1>Eliminar Usuarios</h1>
                            <p>Elimina los usuarios con estado none, que tengan máximo n cantidad de likes</p>
                        </div>
                    </div>

                    <br style={{ borderWidth: "2px" }} />
                    {/* <div className="row">
                        <div className="col-md-3">
                            <Form id="deleteFanForm">
                                <Form.Group controlId="formFansDelete">
                                    <Form.Label>Número máximo de likes</Form.Label>
                                    <Form.Control type="text" placeholder="Digite número" />
                                </Form.Group>
                                <Button 
                                    variant="danger"
                                    onClick={this.handleButtonClick}>
                                    ELiminar
                                </Button>
                            </Form>
                        </div>
                    </div> */}
                </div>
                    <Route exact path="/fans/:id" component={FansPosts}/>
            </div>
        )
    }

    componentWillUnmount() {
        this._mounted = false
    }

}

export default TableFans;