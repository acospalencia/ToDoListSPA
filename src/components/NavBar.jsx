import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../repositories/firebase/config";
import { SesionContext } from "../repositories/context/SesionContext";
import { AuthContext } from "../repositories/context/AuthContext";

export const NavBar = () => {

    const { setView } = useContext(SesionContext);
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/sesion");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#572121ff" }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    To Do List
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTodo"
                    aria-controls="navbarTodo"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTodo">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Inicio
                            </Link>
                        </li>
                        {user ? (

                            <li className="nav-item">
                                <a onClick={handleLogout} className="nav-link cursor-pointer">
                                    Cerrar Sesión
                                </a>
                            </li>
                        ) : (

                            <>
                                <li className="nav-item">
                                    <a
                                        onClick={() => {
                                            setView("register");
                                            navigate("/sesion");
                                        }}
                                        className="nav-link cursor-pointer"
                                    >
                                        Regístrate
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        onClick={() => {
                                            setView("login");
                                            navigate("/sesion");
                                        }}
                                        className="nav-link cursor-pointer"
                                    >
                                        Iniciar Sesión
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

