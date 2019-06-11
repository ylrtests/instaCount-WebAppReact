import React from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from "axios"
import { URL, getToken } from "../../../Helpers"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

const PostDetailsSchema = Yup.object().shape({
    id_insta: Yup.string().required("Id requerido"),
    date: Yup.string().required("Fecha requerida")
})

class PostCreate extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isSavingPost: false
        }

        this.handleGuardarNuevoPost = this.handleGuardarNuevoPost.bind(this)
        this.goBackToPostsFromModal = this.goBackToPostsFromModal.bind(this)
    }

    handleGuardarNuevoPost(values) {
        this.setState({
            isSavingPost: true
        })

        axios({
            method: "POST",
            headers: {
                "Authorization": "bearer " + getToken()
            },
            url: URL + "/post/add",
            data: values
        }).then((response) => {
            let data = response.data
            console.log(data)

            if (data.success) {
                console.log("todo bien")
                this.props.history.push("/posts")
                this.props.history.go("/posts")
            }
            else {
                console.log("todo mal")
            }
        }).catch((error) => {
            console.log("Error en Post add: " + error)
        })

    }

    goBackToPostsFromModal() {
        this.props.history.push("/posts")
    }

    render() {
        let elementToShow = this.state.isSavingPost
            ? <ModalBody>
                <div>Cargando...</div>
            </ModalBody>
            : <Formik
                onSubmit={(values) => { this.handleGuardarNuevoPost(values) }}
                validationSchema={PostDetailsSchema}
                initialValues={{
                    id_insta: '',
                    date: ''
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <ModalBody>
                            <div className="form-group">
                                <label htmlFor="id_insta">ID del post</label>
                                <Field className="form-control" name="id_insta" />
                                {errors.id_insta && touched.id_insta ?
                                    <p className="text-danger">{errors.id_insta}</p>
                                    : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Fecha (YYYY-MM-DD)</label>
                                <Field className="form-control" name="date" />
                                {errors.date && touched.date ?
                                    <p className="text-danger">{errors.date}</p>
                                    : null}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit">Guardar post</Button>{' '}
                        </ModalFooter>
                    </Form>
                )}
            </Formik>
        return (
            <Modal isOpen={true} toggle={this.goBackToPostsFromModal}>
                <ModalHeader toggle={this.goBackToPostsFromModal}> Añadir nuevo post</ModalHeader>
                {elementToShow}
            </Modal>
        )
    }
}

export default PostCreate