import React from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import axios from "axios"
import { URL, getToken } from "../../../Helpers"
import PostsGridContainer from "../posts/components/PostsGridContainer"

class FanPosts extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            fan: {},
            posts: {},
            isLoading: true,
            numberOfRows: undefined
        }

        this.goBackToPostsFromModal = this.goBackToPostsFromModal.bind(this)
    }

    componentDidMount() {
        const { match: { params } } = this.props
        this._mounted = true

        axios({
            method: "GET",
            headers: {
                "Authorization": "bearer " + getToken()
            },
            url: URL + "/fan/posts?user=" + params.id,
        }).then((response) => {
            let data = response.data

            if (data.success && this._mounted) {
                let numberOfRows = Math.ceil(data.posts.length / 3)

                this.setState({
                    fan: data.fan,
                    posts: data.posts,
                    numberOfRows: numberOfRows,
                    isLoading: false
                })
            }
            else {
                console.log("Error success... Fan Posts")
                console.log(data)
            }
        }).catch((error) => {
            console.log("errro..." + error)
        })
    }

    goBackToPostsFromModal() {
        this.props.history.push("/fans")
    }


    render() {
        let renderData = this.state.isLoading
            ? <ModalBody>
                <div>Cargando...</div>
            </ModalBody>
            : <ModalBody>
                <PostsGridContainer
                    posts={this.state.posts}
                    numberOfRows={this.state.numberOfRows} 
                    requestedIn="FansPosts"/>
            </ModalBody>

        return (
            <div>
                <Modal isOpen={true} toggle={this.goBackToPostsFromModal}>
                    <ModalHeader toggle={this.goBackToPostsFromModal}> Detalles usuario: </ModalHeader>
                    {renderData}
                </Modal>
            </div>
        )
    }

    componentWillUnmount() {
        this._mounted = false
    }
}

export default FanPosts