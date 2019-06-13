import React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { getToken, URL } from "../../../../Helpers";


const FanDeleteSchema = Yup.object().shape({
    numero: Yup.number()
        .required("Requerido")
        .moreThan(0, "Número debe ser mayor a 0")
})

class DeleteFans extends React.Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values) {
        console.log(values)
        axios({
            method: "POST",
            headers:{
                "Authorization" : "bearer " + getToken()
            },
            url: URL + "/fan/delete",
            data: values
        }).then((response) => {
            let data = response.data
            console.log(data)

            if(data.success){
                this.props.history.go("/fans")
            }
            else{
                console.log("Error elimninando usuarios")
            }

        }).catch( (error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div style={{ border: "2px outset whitesmoke", padding: "1em" }}>
                <div className="row">
                    <div className="col">
                        <h1>Eliminar Usuarios</h1>
                        <p>Elimina los usuarios con estado none, que tengan máximo n cantidad de likes</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <Formik
                            onSubmit={(values) => { this.handleSubmit(values) }}
                            validationSchema={FanDeleteSchema}
                            initialValues={{
                                numero: '',
                            }}
                        >{({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="numero">Número</label>
                                    <Field className="form-control" name="numero" />
                                    {errors.numero && touched.numero ?
                                        <p className="text-danger">{errors.numero}</p>
                                        : null}
                                </div>
                                <button className="btn btn-danger" type="submit">Eliminar</button>

                            </Form>
                        )}
                        </Formik>
                    </div>
                </div>
            </div>

        )
    }
}

export default DeleteFans