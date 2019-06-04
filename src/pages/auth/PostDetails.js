import React from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from "axios"
import {URL, getToken} from "../../Helpers"

class PostDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            postToShowInModal: {}
        }

        this.goBackToPosts = this.goBackToPosts.bind(this)
    }


    componentDidMount(){
        const {match: {params}} = this.props
        this._mounted = true
        
        axios({
            method: "GET",
            url: URL+"/post/"+params.id_insta,
            headers: {
                "Authorization": "bearer "+getToken()
            }
        }).then( (response) => {
            let data = response.data

            if(data.success && this._mounted){
                this.setState({
                    postToShowInModal: data.post
                })
            }
            else{
                console.log("algo mal en Post Details")
            }
        }).catch( (error) => {
            console.log("Error en Post Details: "+error)
        })
    }

    goBackToPosts(){
        this.props.history.push("/posts")
    }

    render() {
        return (

            <div>
                <Modal isOpen={true} toggle={this.goBackToPosts}>
                    <ModalHeader toggle={this.goBackToPosts}> {this.state.postToShowInModal.id_insta}</ModalHeader>
                    <ModalBody>
                        {this.state.postToShowInModal.date}    
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggleModal}>Añadir likes</Button>
                        <Button color="warning" onClick={this.toggleModal}>Guardar cambios</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>

        )
    }

    componentWillUnmount(){
        this._mounted = false
    }
}

export default PostDetails