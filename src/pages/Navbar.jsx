import React,{useState, useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";



const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("first_name");
        const email = localStorage.getItem("email");

        if (!token) {
            alert("Debes iniciar sesión");
            navigate("/");
        } else {
            setUser(user || "Usuario"); // Mostrar "Usuario" si no hay username
            setEmail(email || 'email@21');
            console.log(token);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        navigate("/");
    };



    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#31511E" }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="" style={{ color: "white" }} onClick={() => navigate('/welcome')}>Prestamos Ya!</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link " href="" onClick={()=>navigate('/clientes')} aria-current="page" style={{ color: "white" }}>Clientes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: "white" }}>Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: "white" }}>Pricing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="" onClick={()=>navigate('/iniciador')} aria-disabled="true" style={{ color: "white" }}>k-means</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link"  href="" aria-disabled="true" style={{ color: "white" }} onClick={handleLogout}>Logaut</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;
