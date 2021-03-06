import React from "react"
import { URL } from "../Helpers"
import axios from "axios"
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup'
import SweetAlert from "sweetalert-react"
import auth from "../Auth"

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email no válido')
        .required('Email requerido'),
    password: Yup.string()
        .min(6, '')
        .max(16, '')
        .required('Contraseña requerida')
})


class Login extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            sweetAlertShow: false,
            sweetAlertType: "success",
            sweetAlertTitle: "",
            sweetAlertText: ""
        }

        this.handleLogin = this.handleLogin.bind(this)
        this.refButton = React.createRef();
    }

    handleLogin(values) {
        this.refButton.current.setAttribute("disabled","")
        axios({
            method: 'post',
            url: URL + '/login',
            data: values

        }).then((response) => {
            let data = response.data

            if (data.success) {
                auth.login(() => {
                    localStorage.setItem('token', data.token)
                    this.props.history.go('/')
                    //this.props.history.push('/')
                })
            }
            else {
                this.setState({
                    sweetAlertShow: true,
                    sweetAlertType: "error",
                    sweetAlertTitle: "",
                    sweetAlertText: data.message
                })
                this.refButton.current.removeAttribute("disabled")
            }

        }).catch((error) => {
            console.log(error + "")
            this.setState({
                sweetAlertShow: true,
                sweetAlertType: "error",
                sweetAlertTitle: "",
                sweetAlertText: "Error: " + error
            })
            this.refButton.current.removeAttribute("disabled")
        })
    }

    render() {
        return (
            <div className="container-fluid full-vph">
                <SweetAlert
                    show={this.state.sweetAlertShow}
                    type={this.state.sweetAlertType}
                    title={this.state.sweetAlertTitle}
                    text={this.state.sweetAlertText}
                    onConfirm={() => {
                        this.setState({ sweetAlertShow: false })
                    }}
                />

                <Formik
                    onSubmit={(values) => { this.handleLogin(values) }}
                    validationSchema={LoginSchema}
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                >
                    {({ errors, touched }) => (
                        <div className="login-form">
                            <h3>instaCount</h3>
                            <div className="mb-4 border-bottom"></div>
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <Field className="form-control" name="email" />
                                    {errors.email && touched.email ?
                                        <p className="text-danger">{errors.email}</p>
                                        : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Contraseña</label>
                                    <Field className="form-control" name="password" type="password" />
                                    {errors.password && touched.password ?
                                        <p className="text-danger">{errors.password}</p>
                                        : null}
                                </div>

                                <button ref={this.refButton} className="btn btn-success" style={{ width: "100%" }} type="subtmit">Iniciar sesión</button>
                            </Form>

                            <div className="mb-4 mt-4 border-bottom"></div>

                            <p className="text-center">Debes tener una cuenta previamente registrada para entrar.</p>

                        </div>
                    )}

                </Formik>
            </div>
        )
    }
}

export default Login