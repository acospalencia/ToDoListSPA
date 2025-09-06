import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { useContext } from "react"
import { SesionContext } from "../../repositories/context/SesionContext"

export const SesionView = () => {
    const { view } = useContext(SesionContext);
    return (
        <div>
            {view === "login" ? <Login /> : <Register />}
        </div>
    )
}


