import { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify"
import { useAuthContext } from "../context/AuthContext";

const User = () => {
    const { user, token, setUser } = useAuthContext();
    const [editMode, setEditMode] = useState(false);

    const handleUpdateProfile = async (values, { resetForm }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}user/profile`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setEditMode(false);
                setUser(data.result)
                resetForm({values:{
                    name: data.result.name,
                    lastname: data.result.lastname,
                    password: "",
                },});
                toast.success("Actualizado con éxito.")
                return data;
            } else {
                toast.warning("Ha ocurrido un error, intenta de nuevo")
            }
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    };

    return (
        <div className="pt-4">
            <h2 className="pt-3 text-center mt-5 pt-5">Mi perfil</h2>
            <div className="container pt-5 w-50 mb-5">
                <Formik
                    initialValues={{
                        name: user.name,
                        lastname: user.lastname,
                        password: "",
                    }}
                    validate={(values) => {
                        let validations = {};
                        console.log(values.name)
                        if (!values.name) {
                            validations.name = 'Por favor ingresa un nombre';
                        } else if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(values.name)) {
                            validations.name = 'El nombre solo puede contener letras';
                        } else if (values.name.length < 2) {
                            validations.name = 'Ingrese un nombre válido';
                        }
                        if (!values.lastname) {
                            validations.lastname = 'Por favor ingresa un apellido';
                        } else if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(values.lastname)) {
                            validations.lastname = 'El apellido solo puede contener letras';
                        } else if (values.lastname.length < 2) {
                            validations.lastname = 'Ingrese un apellido válido';
                        }
                       if (values.password && values.password.length < 6) {
                            validations.password = 'La contraseña es demasiado corta';
                        }

                        return validations;
                    }}
                    onSubmit={handleUpdateProfile}
                >
                    {({ errors }) => (
                        <Form className="profile-form">
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label">
                                    Nombre
                                </label>
                                <div className="col-sm-10">
                                    <Field
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        disabled={!editMode}
                                    />
                                    <ErrorMessage name='name' component={() => (
                                        <div className='form-error'>{errors.name}</div>
                                    )} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="lastname" className="col-sm-2 col-form-label">
                                    Apellido
                                </label>
                                <div className="col-sm-10">
                                    <Field
                                        type="text"
                                        className="form-control"
                                        name="lastname"
                                        disabled={!editMode}
                                    />
                                        <ErrorMessage name='lastname' component={() => (
                                        <div className='form-error'>{errors.lastname}</div>
                                    )} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-2 col-form-label">
                                    Email
                                </label>
                                <div className="col-sm-10">
                                    <Field
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        defaultValue={user.email}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="password" className="col-sm-2 col-form-label">
                                    Password
                                </label>
                                <div className="col-sm-10">
                                    <Field
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        disabled={!editMode}
                                    />
                                     <ErrorMessage name='password' component={() => (
                                        <div className='form-error'>{errors.password}</div>
                                    )} />
                                </div>
                            </div>
                            {editMode ? (
                                <>
                                    <div className="d-flex mt-3 gap-5 justify-content-center">
                                        <button type="submit" className="btn btn-info">
                                            Actualizar
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="d-flex mt-3 gap-5 justify-content-center">
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="btn btn-success"
                                    >
                                        Editar
                                    </button>
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default User;
