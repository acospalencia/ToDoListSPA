import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../repositories/firebase/config";
import { useNavigate } from 'react-router';



const schema = yup.object({
    email: yup.string().email("Por favor ingresa un formato correcto: email.@email.com").required(),
    password: yup.string().required().min(8, "Ingresa una contraseña valida")
})

export const Login = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitForm = (datos) => {
        signInWithEmailAndPassword(auth, datos.email, datos.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                alert("Inicio de sesion exitoso")
                navigate("/");

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert("Error al iniciar sesion, por favor verifica tus datos")
            });
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#121212" }}>
                <div className="card p-4 shadow-lg" style={{ width: "400px", backgroundColor: "#1c1c1c", borderRadius: "12px" }}>

                    <h2 className="text-center text-white mb-4">Iniciar sesion</h2>

                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <label className="form-label text-white">Email</label>
                        <input className="form-control bg-dark text-white border-secondary" type="email" {...register('email')} />
                        <p className="text-danger small">{errors.email && errors.email.message}</p>

                        <label className="form-label text-white">Password</label>
                        <input className="form-control bg-dark text-white border-secondary" type="password" {...register('password')} />
                        <p className="text-danger small">{errors.password && errors.password.message}</p>

                        <button className="btn btn-success w-100 fw-bold mt-3">Registrarse</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

