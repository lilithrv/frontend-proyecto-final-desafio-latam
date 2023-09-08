import { Field, Formik, Form, ErrorMessage } from 'formik';
import { toast } from "react-toastify"

export default function Register() {

    const handleRegister = async (values, { resetForm }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Usuario agregado con éxito", {position: toast.POSITION.TOP_CENTER})
                resetForm();
            } else {
                toast.warning("Ya existe una cuentra registrada con este correo", {autoclose: 5000, position: toast.POSITION.TOP_CENTER})
            }
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    };

    return (
        <>
            <main className='container pt-5 mt-5 pb-5'>
                <h2 className='text-center mt-5 mb-4'>Formulario de Registro:</h2>
                <Formik
                    initialValues={{
                        name: '',
                        lastname: '',
                        email: '',
                        password: '',
                        repeatPassword: '',
                        birthday: '',
                    }}

                    validate={(values) => {

                        let validations = {};

                        // Validación name
                        if (!values.name) {
                            validations.name = 'Por favor ingresa un nombre';
                        } else if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(values.name)) {
                            validations.name = 'El nombre solo puede contener letras';
                        } else if (values.name.length < 2) {
                            validations.name = 'Ingrese un nombre válido';
                        }

                        // Validación lastname
                        if (!values.lastname) {
                            validations.lastname = 'Por favor ingresa un apellido';
                        } else if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(values.lastname)) {
                            validations.lastname = 'El apellido solo puede contener letras';
                        } else if (values.lastname.length < 2) {
                            validations.lastname = 'Ingrese un apellido válido';
                        }

                        // Validación email
                        if (!values.email) {
                            validations.email = 'Por favor ingresa un correo válido';
                        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                            validations.email = 'Por favor ingresa un correo válido';
                        }

                        // Validación password
                        if (!values.password) {
                            validations.password = 'Por favor ingrese una contraseña';
                        } else if (values.password.length < 6) {
                            validations.password = 'La contraseña es demasiado corta';
                        }

                        // x2 Validación password
                        if (!values.repeatPassword) {
                            validations.repeatPassword = 'Por favor repita la contraseña correctamente';
                        } else if (values.password !== values.repeatPassword) {
                            validations.repeatPassword = 'Las contraseñas no coinciden';
                        }

                        // Validación birthday
                        const currentDate = new Date(); // Obtener la fecha actual
                        const selectedDate = new Date(values.birthday); // Obtener la fecha ingresada

                        if (!values.birthday) {
                            validations.birthday = 'Por favor ingrese su fecha de nacimiento';
                        } else if (selectedDate > currentDate) {
                            validations.birthday = 'La fecha de nacimiento no puede ser mayor al día actual';
                        } else if (currentDate.getFullYear() - selectedDate.getFullYear() < 18) {
                            validations.birthday = 'Debes tener al menos 18 años';
                        }

                        return validations;
                    }}
                    onSubmit={handleRegister}
                >

                    {({ errors }) => (
                        <Form className='register-form'>
                            <div className='form-field'>
                                <label className='form-label' htmlFor="name">Nombre</label>
                                <Field
                                    className="form-input"
                                    type="text"
                                    id='name'
                                    name='name'
                                    placeholder='Susan'
                                />
                                <ErrorMessage name='name' component={() => (
                                    <div className='form-error'>{errors.name}</div>
                                )} />

                            </div>
                            <div className='form-field'>
                                <label className='form-label' htmlFor="lastname">Apellido</label>
                                <Field
                                    className="form-input"
                                    type="text"
                                    id='lastname'
                                    name='lastname'
                                    placeholder='Navarro'
                                />
                                <ErrorMessage className='form-error' name='lastname'
                                    component={() => (
                                        <div className='form-error'>{errors.lastname}</div>
                                    )} />

                            </div>
                            <div className='form-field'>
                                <label className='form-label' htmlFor="email">Correo</label>
                                <Field
                                    className="form-input"
                                    type="email"
                                    id='email'
                                    name='email'
                                    placeholder='correo@correo.com'
                                />
                                <ErrorMessage name='email'
                                    component={() => (
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
                                    placeholder='********'
                                />
                                <ErrorMessage name='password'
                                    component={() => (
                                        <div className='form-error'>{errors.password}</div>
                                    )} />
                            </div>
                            <div className='form-field'>
                                <label className='form-label' htmlFor="repeatPassword">Repetir contraseña</label>
                                <Field
                                    className="form-input"
                                    type="password"
                                    id='repeatPassword'
                                    name='repeatPassword'
                                    placeholder='********'
                                />
                                <ErrorMessage name='repeatPassword'
                                    component={() => (
                                        <div className='form-error'>{errors.repeatPassword}</div>
                                    )} />
                            </div>
                            <div className='form-field'>
                                <label className='form-label' htmlFor="birthday">Fecha de nacimiento</label>
                                <Field
                                    className="form-input form-input--date"
                                    type="date"
                                    id='birthday'
                                    name='birthday'
                                />
                                <ErrorMessage name='birthday'
                                    component={() => (
                                        <div className='form-error'>{errors.birthday}</div>
                                    )} />
                            </div>
                            <button className='form-button' type="submit">Registrar</button>
                        </Form>
                    )}
                </Formik >
            </main>
        </>
    );
}
