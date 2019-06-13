import React from "react"
import Header from "../../../components/Header"
import { URL, getToken } from "../../../Helpers"
import axios from "axios"
import { Route, Link } from "react-router-dom"
import PostDetails from "./PostShow"
import PostCreate from "./PostCreate"
import PostsGridContainer from "./components/PostsGridContainer"


class Posts extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            numberOfRows: undefined,
            isLoading: true
        }

    }

    componentDidMount() {
        axios({
            method: "GET",
            url: URL + "/post",
            headers: {
                "Authorization": "bearer " + getToken()
            }
        }).then((response) => {
            let data = response.data

            if (data.success) {
                let numberOfRows = Math.ceil(data.posts.length / 3)

                this.setState({
                    posts: data.posts,
                    numberOfRows: numberOfRows,
                    isLoading: false
                })
            }
            else {
                console.log("Error obteniendo posts")
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {

        if (this.state.isLoading) {
            return (<div>Cargando posts..</div>)
        }
        else {
            return (
                <div>
                    <Header pathname={this.props.location.pathname}/>
                    <div className="container-fluid  mt-4">
                        <div className="row justify-content-center">
                            <Link to="/posts/create">
                                <button className="btn btn-success" type="button">
                                    Agregar nuevo post
                                </button>
                            </Link>
                        </div>
                        <PostsGridContainer
                            posts={this.state.posts}
                            numberOfRows={this.state.numberOfRows} />
                    </div>
                    <Route exact path="/posts/create" component={PostCreate} />
                    <Route exact path="/posts/show/:id_insta" component={PostDetails} />
                </div>
            )
        }
    }
}

export default Posts