import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "../Navbar";
import "../../style/create_cliente.css";

const ClienteCreate = () => {
    const token = localStorage.getItem("token");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [fecha_nacimiento, setFecha_nacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [genero, setGenero] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const handleCreateCliente = async (event) => {
        event.preventDefault();
        setError("");
        try {
            const response = await axios.post('http://localhost:8000/api/clientes/create', {
                nombre,
                apellidos,
                fecha_nacimiento,
                telefono,
                genero,
            },
                {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                }
            );
            navigate('/clientes');
        } catch (err) {
            setError(err.response?.data?.error || "Error al cargar los clientes"); // Maneja el error
        }

    }
    return (
        <div>
            <Dashboard></Dashboard>
            <div className="container">
                <div className="container-cliente">
                    <div className="box-cliente">
                        <div className="cards-cliente">
                            <div className="register">
                                <h3 className="h-cliente">Registrar nuevo usuario</h3>
                            </div>
                            <form className="form-cliente" onSubmit={handleCreateCliente}>
                                <div className="">
                                    <label htmlFor="">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="">Apellidos</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="apellidos"
                                        value={apellidos}
                                        onChange={(e) => setApellidos(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="">Fecha de nacimiento</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="fecha_nacimiento"
                                        value={fecha_nacimiento}
                                        onChange={(e) => setFecha_nacimiento(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="">Telefono</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="telefono"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="">Genero</label>
                                    <select
                                        className="form-control"
                                        id="genero"
                                        value={genero}
                                        onChange={(e) => setGenero(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Selecciona un género</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                    </select>
                                    <button className="btn-cliente"
                                        type="submit"
                                    >
                                        Resgistrar
                                    </button>
                                </div>

                            </form>
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => navigate("/clientes")}
                            >
                                Cancelar
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    );

};
export default ClienteCreate;