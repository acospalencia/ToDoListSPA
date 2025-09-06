import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../repositories/firebase/config"; // ajusta ruta según tu proyecto
import { useContext } from "react";
import { AuthContext } from "../../../repositories/context/AuthContext";


const schema = yup.object({
    title: yup.string().required("Por favor ingresa un título").min(2, "El título debe tener al menos 2 caracteres"),
    descripcion: yup.string().required("Por favor ingresa una descripción").min(8, "La descripción debe tener al menos 8 caracteres")
})

export const NuevaTarea = () => {
    const { user } = useContext(AuthContext); 

    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitForm = async (datos) => {
        try {
            await addDoc(collection(db, "Tareas"), {
                title: datos.title,
                descripcion: datos.descripcion,
                completed: false,
                createdAt: serverTimestamp(),
                updateAt: serverTimestamp(),
                userId: user.uid,
            });

            reset(); // limpia el formulario
        } catch (error) {
            console.error("Error al guardar la tarea:", error);
            alert("Hubo un problema al guardar la tarea.");
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-start" >
                <div className="card  shadow-lg border border-rounded border-dark" style={{ width: "400px", backgroundColor: "#572121ff", borderRadius: "12px" }}>

                    <h2 className="text-center text-white mb-4">Nueva tarea</h2>

                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <label className="form-label text-white">Titulo de la tarea</label>
                        <input className="form-control  text-black border-secondary" type="text" {...register('title')} />
                        <p className="text-danger small">{errors.titulo && errors.titulo.message}</p>

                        <label className="form-label text-white">Descripcion</label>
                        <input className="form-control  text-black border-secondary" type="text" {...register('descripcion')} />
                        <p className="text-danger small">{errors.descripcion && errors.descripcion.message}</p>

                        <button className="btn btn-success w-100 fw-bold mt-3">Nueva tarea</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

