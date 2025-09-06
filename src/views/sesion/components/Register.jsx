import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../repositories/firebase/config";
import { useContext } from "react";
import { useNavigate } from "react-router";

const schema = yup.object({
    email: yup.string().email("Por favor ingresa un formato correcto: email.@email.com").required(),
    password: yup.string().required().min(8, "Deben ser minimo 8 caracteres")
        .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
        .matches(/[0-9]/, "Debe contener al menos un número"),
    confirm_Password: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas no coinciden").required("Por favor confirma tu contraseña")
})

export const Register = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    // Firebase Auth
    const onSubmitForm = (datos) => {
        console.log(datos);

        createUserWithEmailAndPassword(auth, datos.email, datos.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);

                alert("Usuario registrado con exito")
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert("Error al registrar usuario")
            });




    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#121212" }}>
            <div className="card p-4 shadow-lg" style={{ width: "400px", backgroundColor: "#1c1c1c", borderRadius: "12px" }}>

                <h2 className="text-center text-white mb-4">Crear Cuenta</h2>

                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <label className="form-label text-white">Email</label>
                    <input className="form-control bg-dark text-white border-secondary" type="email" {...register('email')} />
                    <p className="text-danger small">{errors.email && errors.email.message}</p>

                    <label className="form-label text-white">Password</label>
                    <input className="form-control bg-dark text-white border-secondary" type="password" {...register('password')} />
                    <p className="text-danger small">{errors.password && errors.password.message}</p>

                    <label className="form-label text-white">Confirm Password</label>
                    <input className="form-control bg-dark text-white border-secondary" type="password" {...register('confirm_Password')} />
                    <p className="text-danger small">{errors.confirm_Password && errors.confirm_Password.message}</p>

                    <button className="btn btn-success w-100 fw-bold mt-3">Registrarse</button>
                </form>
            </div>
        </div>

    )
}
