import { ListaTareas } from "./components/ListaTareas"
import { NuevaTarea } from "./components/NuevaTarea"

import { useEffect, useState, useContext } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../repositories/firebase/config";
import { AuthContext } from "../../repositories/context/AuthContext";

export const HomeView = () => {
    const { user } = useContext(AuthContext); 
    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        const q = query(
            collection(db, "Tareas"),
            where("userId", "==", user.uid) 
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tareas = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTasks(tareas);
        });

        return () => unsubscribe(); 
    }, [user]);

    return (
        <div className="container mt-5">
            <div className=" row ">
                <section className="col-lg-4 col-sm-12 border border-5 border-dark">
                    <NuevaTarea />
                </section>
                <section className="col-lg-8 col-sm-12 border border-5 border-dark">
                    <ListaTareas tasks={tasks} />
                </section>
            </div>

        </div>
    )
}
