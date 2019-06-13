import React from "react";
import { MDBDataTable } from 'mdbreact';
import axios from "axios"
import { URL, getToken } from "../../../../Helpers"
import { Link } from "react-router-dom"

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
                    sort: 'asc',
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
                    posts_count:  row.posts_count,
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
            </div>
        )
    }

    componentWillUnmount() {
        this._mounted = false
    }

}

export default TableFans;