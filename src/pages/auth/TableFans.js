import React from "react";
import { MDBDataTable } from 'mdbreact';
import axios from "axios"
import {URL, getToken} from "../../Helpers"

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
                    label: 'Post-Count',
                    field: 'postCount',
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

    handleButtonClick(){

        let formData = new FormData(document.getElementById('deleteFanForm'))
        console.log(formData)

        //     fetch('http://instacount:8080/api/fan/delete', {
        //     method: 'post',
        //     body: new FormData()
        // }).then(res => res.json())
        //     .then(res => console.log(res));
    }


    // componentDidMount() {
    //     console.log('hola')
    //     fetch('http://instacount:8080/api/fan')
    //         .then(response => response.json())
    //         .then((myJson) => {
    //             console.log(myJson)
    //             let rows = myJson.fans.map((row) => {
    //                 return ({
    //                     id: row.id,
    //                     username: row.username,
    //                     status: row.status,
    //                     postCount: row.postCount,
    //                     url: [<a key={row.url} href={row.url} target="_blank" rel="noopener noreferrer">{row.url}</a>]

    //                 })
    //             });

    //             console.log('---')
    //             this.setState({
    //                 data: {
    //                     columns: this.state.columns,
    //                     rows: rows
    //                 },
    //                 rows: rows
    //             })
    //         })
    // }

    componentDidMount(){
        this._mounted = true
        console.log("Se monto tabla...")

        axios({
            method: "GET",
            url: URL + "/fan",
            headers: {
                "Authorization": 'bearer ' + getToken(),
            }
        }).then( (response) => {

            let datos = response.data;
            let newFans = datos.fans.map((row) => {
                return ({
                    id: row.id,
                    username: row.username,
                    status: row.status,
                    postCount: row.postCount,
                    url: [<a key={row.url} href={row.url} target="_blank" rel="noopener noreferrer">{row.url}</a>]

                })
            })

            console.log(newFans)

            // this._mounted se usa para no alterar el state en caso de que
            // el componente se haya cerrado...

            if (datos.success && this._mounted) {
                console.log('---')
                this.setState({
                    fans: newFans,
                    data: {
                        columns: this.state.columns,
                        rows: newFans
                    }
                })
            }
            else {
                //console.log("success falso");
            }
        })
    }


    render() {

        console.log('Render')
        console.log(this.state.data)
        return (
            <div>
                <MDBDataTable
                    striped
                    bordered
                    data={this.state.data}
                />
                <div style={{border: "2px outset whitesmoke", padding: "1em"}}>
                    <div className="row">
                        <div className="col">
                            <h1>Eliminar Usuarios</h1>
                            <p>Elimina los usuarios con estado none, que tengan máximo n cantidad de likes</p>   
                        </div>
                    </div>
                                
                    <br style={{borderWidth: "2px"}}/>       
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

            </div>
        )
    }

    componentWillUnmount(){
        this._mounted = false
    }

}

export default TableFans;