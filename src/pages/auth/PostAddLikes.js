import React from "react"
import axios from "axios"
import { URL, getToken } from "../../Helpers"
import { Formik, Form, Field } from "formik"
import { Button, ModalBody, ModalFooter } from 'reactstrap'

class PostAddLikes extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sendingUsersAndLikes: false
        }
        this.storeAddLikes = this.storeAddLikes.bind(this)
        this.afterSuccessAddLikes = this.afterSuccessAddLikes.bind(this)
    }

    storeAddLikes(values) {
        let objetoJson = JSON.parse(values.jsontext)
        console.log("En json")
        console.log(objetoJson)

        this.setState({
            sendingUsersAndLikes: true
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
        let elementToShow = this.state.sendingUsersAndLikes
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
                                    <textarea className="form-control" defaultValue={this.props.scriptInText} id="textareaJS" name="textareaJS" rows="1">
                                    </textarea>
                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-success" onClick={() => {
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
                {elementToShow}
            </div>
        )
    }
}

export default PostAddLikes