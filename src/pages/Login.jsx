import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const {saveToken} = useAuthContext()
    const navigate = useNavigate()

    const handleSubmit = async (values, { resetForm }) => {
        try {
          const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
    
          if (response.ok) {
            const data = await response.json()
            saveToken(data.access_token)
            resetForm();
            setLoginSuccess(true);
            setTimeout(() => setLoginSuccess(false), 4000);
            console.log("Login exitoso");
            navigate("/")
          } else {
            console.log("Error en la solicitud");
          }
        } catch (error) {
          console.log("Error en la solicitud:", error);
        }
      };

    return (

        <>
            <div className='container mt-5 pt-5 pb-5 mb-5'>
                <h2 className="text-center pt-5 pb-4">Ingresa a tu cuenta:</h2>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}

                    validate={(values) => {
                        let validations = {}

                        if (!values.email) {
                            validations.email = 'Por favor ingresa un correo válido';
                        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                            validations.email = 'Por favor ingresa un correo válido';
                        }

                        if (!values.password) {
                            validations.password = 'Por favor ingrese una contraseña';
                        } else if (values.password.length < 6) {
                            validations.password = 'La contraseña es demasiado corta';
                        }
                        return validations;
                    }}

                    onSubmit={handleSubmit}
                >
                    {({ errors }) => (
                        <Form className='register-form'>
                            <div className='form-field'>
                                <label className='form-label' htmlFor="email">Correo</label>
                                <Field
                                    className="form-input"
                                    type="text"
                                    id='email'
                                    name='email'
                                    placeholder='correo@correo.cl'
                                />
                                <ErrorMessage name='email' component={() => (
                                    <div className='form-error'>{errors.email}</div>
                                )} />

                            </div>
                            <div className='form-field'>
                                <label className='form-label' htmlFor="password">Contraseña</label>
                                <Field
                                    className="form-input"
                                    type="password"
                                    id='password'
                                    name='password'
                                    placeholder='*******'
                                />
                                <ErrorMessage className='form-error' name='password'
                                    component={() => (
                                        <div className='form-error'>{errors.password}</div>
                                    )} />

                            </div>
                            <div className='login-button-container'>
                                <button className='form-button-login' type="submit">Login</button>
                                <p>Aun no tienes cuenta? crea una aquí</p>
                            </div>

                            {loginSuccess && <p className="success-message">Login exitoso</p>}
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}