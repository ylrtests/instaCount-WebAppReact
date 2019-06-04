import React from "react"
import Header from "../../components/Header"
import { URL, getToken } from "../../Helpers"
import axios from "axios"
import PostContainer from "./PostContainer"
import PostDetails from "./PostDetails"
import { Route } from "react-router-dom"




class Posts extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            numberOfRows: undefined,
            isLoading: true
        }

        this.listPostsComponent = this.listPostsComponent.bind(this)
        this.storeRows = this.storeRows.bind(this)
        this.handleVerDetallesPost = this.handleVerDetallesPost.bind(this)
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

    listPostsComponent(e) {
        return <PostContainer onVerDetallesPost={() => this.handleVerDetallesPost(e.id_insta)} key={e.id} id_insta={e.id_insta} fans_count={e.fans_count} />
    }

    storeRows(posts, key) {
        let postsForRow = posts.splice(0, 3)

        if (postsForRow.length === 1) {
            return (
                <div className="posts-row" key={key}>
                    {postsForRow}
                    <div className="posts-child"></div>
                    <div className="posts-child"></div>
                </div>
            )
        }
        else if (postsForRow.length === 2) {
            return (
                <div className="posts-row" key={key}>
                    {postsForRow}
                    <div className="posts-child"></div>
                </div>
            )
        }

        return (
            <div className="posts-row" key={key}>
                {postsForRow}
            </div>
        )
    }

    handleVerDetallesPost(id_insta) {
        console.log("Llego este ID")
        console.log(id_insta)
    }

    render() {

        if (this.state.isLoading) {
            return (<div>Cargando..</div>)
        }
        else {

            let posts = this.state.posts.map((e) => this.listPostsComponent(e))
            let rows = []

            //LLama a la función storeRows, donde va dividiendo los posts
            //Y asi poder crear las filas que se mostrarán
            for (let i = 0; i < this.state.numberOfRows; i++) {
                let row = this.storeRows(posts, i)
                rows.push(row)
            }

            return (
                <div>
                    <Header />
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <button className="btn btn-success">Agregar nuevo post</button>
                        </div>
                        <div className="posts">
                            {rows}
                        </div>
                    </div>
                    <Route path="/posts/:id_insta" exact component={PostDetails} />
                </div>
            )
        }
    }
}

export default Posts