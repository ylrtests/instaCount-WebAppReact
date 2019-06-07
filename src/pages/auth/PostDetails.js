import React from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from "axios"
import { URL, getToken } from "../../Helpers"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

const PostDetailsSchema = Yup.object().shape({
    id_insta: Yup.string().required("Id requerido"),
    date: Yup.string().required("Fecha requerida")
})

// const DatePickerField = ({ name, value, onChange }) => {
//     return (
//         <DatePicker
//             selected={(value && new Date(value)) || null}
//             onChange={val => {
//                 onChange(name, val);
//             }}
//         />
//     );
// }


class PostDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            postToShowInModal: {},
            isLoading: true,
            openAddLikes: false,
            showLoadingAddLikes: false,
            scriptInText: ""
        }

        this.externalWindow = undefined
        this.goBackToPostsFromModal = this.goBackToPostsFromModal.bind(this)
        this.handleGuardarCambios = this.handleGuardarCambios.bind(this)
        this.openAddLikes = this.openAddLikes.bind(this)
        this.storeAddLikes = this.storeAddLikes.bind(this)
        this.afterSuccessAddLikes = this.afterSuccessAddLikes.bind(this)
    }


    componentDidMount() {
        const { match: { params } } = this.props
        this._mounted = true

        axios({
            method: "GET",
            url: URL + "/post/" + params.id_insta,
            headers: {
                "Authorization": "bearer " + getToken()
            }
        }).then((response) => {
            let data = response.data

            if (data.success && this._mounted) {
                this.setState({
                    postToShowInModal: data.post,
                    isLoading: false
                })
            }
            else {
                console.log("algo mal en Post Details")
            }
        }).catch((error) => {
            console.log("Error en Post Details: " + error)
        })
    }

    goBackToPostsFromModal() {
        this.props.history.push("/posts")
    }

    handleGuardarCambios(values) {

    }

    openAddLikes() {
        let url = "https://www.instagram.com/p/" + this.state.postToShowInModal.id_insta
        this.externalWindow = window.open(url, '_blank', "width=360,height=500,left=10")
        fetch("/js/listaLikes.txt")
            .then(response => response.text())
            .then(text => {
                this.setState({
                    openAddLikes: true,
                    scriptInText: text
                })
            })
    }

    storeAddLikes(values) {
        let objetoJson = JSON.parse(values.jsontext)
        console.log("En json")
        console.log(objetoJson)

        this.setState({
            showLoadingAddLikes: true
        })

        axios({
            method: "POST",
            url: URL + "/post/add/likes",
            headers: {
                "Authorization": "bearer " + getToken(),
                "Content-Type": "application/json"
            },
            data: objetoJson
        }).then((response) => {
            let data = response.data
            console.log(data)

            if (data.success) {
                this.afterSuccessAddLikes(data)
            }
            else {
                console.log("error success ")
            }

        }).catch((error) => {
            console.log("error: " + error)
        })
    }

    afterSuccessAddLikes(data) {
        console.log("Se añadieron...")
        this.props.history.push("/posts")
        this.props.history.go("/posts")
    }

    render() {
        console.log("PostDetails render")
        console.log(this.state.postToShowInModal)

        if (this.state.openAddLikes) {

            let formJsonObject = this.state.showLoadingAddLikes
                ? <ModalBody>
                    <div>Cargando...</div>
                </ModalBody>
                : <Formik
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        if (values.jsontext) { this.storeAddLikes(values) }
                    }}
                    initialValues={{
                        jsontext: undefined
                    }}
                >
                    <Form>
                        <ModalBody>
                            <div className="form-group">
                                <label htmlFor="textareaJS">Script en JS</label>
                                <div className="row">
                                    <div className="col-md-8">
                                        <textarea className="form-control" id="textareaJS" name="textareaJS" rows="1">
                                            {this.state.scriptInText}
                                        </textarea>
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-success" onClick={ () => {
                                            var copyText = document.getElementById("textareaJS");
                                            copyText.select();
                                            document.execCommand("copy");
                                            alert("Se ha copiado el texto.");
                                        }}>Copiar</button>
                                    </div>

                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="jsontext">Objeto en formato JSON</label>
                                <Field className="form-control" rows="10" component="textarea" name="jsontext" />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Enviar likes</Button>
                        </ModalFooter>
                    </Form>
                </Formik>

            return (
                <div>
                    <Modal isOpen={true} toggle={this.goBackToPostsFromModal}>
                        <ModalHeader toggle={this.goBackToPostsFromModal}> Añadir likes: {this.state.postToShowInModal.id_insta}</ModalHeader>
                        {formJsonObject}
                    </Modal>
                </div>
            )
        }
        else {  //start else
            let formReadyToLoad = this.state.isLoading
                ? <ModalBody>
                    <div>Cargando...</div>
                </ModalBody>
                : <Formik
                    onSubmit={(values) => { this.handleGuardarCambios(values) }}
                    validationSchema={PostDetailsSchema}
                    enableReinitialize={true}
                    initialValues={{
                        date: this.state.postToShowInModal.date,
                        id_insta: this.state.postToShowInModal.id_insta
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
                                <div>
                                    <p>Ultima actualización: {this.state.postToShowInModal.updated_at}</p>
                                    <p>Id instaCount: {this.state.postToShowInModal.id}</p>
                                    <p>Likes: {this.state.postToShowInModal.fans_count}</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={() => this.openAddLikes()}>Añadir likes</Button>
                                <Button color="warning" type="submit">Guardar cambios</Button>{' '}
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>

            return (
                <div>
                    <Modal isOpen={true} toggle={this.goBackToPostsFromModal}>
                        <ModalHeader toggle={this.goBackToPostsFromModal}> Detalles post: {this.state.postToShowInModal.id_insta}</ModalHeader>
                        {formReadyToLoad}
                    </Modal>
                </div>
            )
        }//end else
    }

    componentWillUnmount() {
        this._mounted = false
    }
}


export default PostDetails