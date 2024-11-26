import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Navbar";

const Clientes = () => {
    // Estado para almacenar la lista de clientes
    const [clientes, setClientes] = useState([]);
    // Estado para manejar errores
    const [error, setError] = useState("");
    // Obtiene el token de autenticación del almacenamiento local
    const token = localStorage.getItem("token");
    // Hook de navegación para redirigir entre rutas
    const navigate = useNavigate();

    /**
     * Función para obtener la lista de clientes desde la API.
     * Se ejecuta al montar el componente y en caso de errores muestra un mensaje.
     */
    const handleClienteGet = async () => {
        try {
            setError(""); // Reinicia el mensaje de error antes de la solicitud
            // Realiza una solicitud GET para obtener los clientes
            const response = await axios.get("http://localhost:8000/api/clientes", {
                headers: {
                    Authorization: `Token ${token}`, // Agrega el token al encabezado para autenticación
                },
            });
            setClientes(response.data); // Actualiza el estado con los datos recibidos
        } catch (err) {
            // Manejo de errores: asigna el mensaje o uno genérico
            setError(err.response?.data?.error || "Error al cargar los clientes");
        }
    };

    // useEffect para ejecutar la solicitud GET cuando el componente se monta
    useEffect(() => {
        handleClienteGet();
    }, []);

    return (
        <div>
            {/* Renderiza el componente del dashboard */}
            <Dashboard />

            {/* Contenedor principal */}
            <div className="container mt-4">
                {/* Botón para redirigir a la página de creación de clientes */}
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                        className="btn btn-success btn-sm"
                        onClick={() => navigate("/cliente/create")}
                    >
                        Nuevo Cliente
                    </button>
                </div>

                {/* Muestra un mensaje de error si existe */}
                {error && <p className="text-danger">{error}</p>}

                {/* Tabla para mostrar la lista de clientes */}
                <table className="table table-sm">
                    <thead className="table table-sm">
                        <tr className="table table-sm">
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Género</th>
                            <th scope="col">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Renderiza las filas de la tabla con los datos de los clientes */}
                        {clientes.map((cliente, index) => (
                            <tr key={cliente.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.apellidos}</td>
                                <td>{cliente.genero}</td>
                                <td>
                                    <button 
                                         className="btn btn-info btn-sm"
                                         onClick={() => navigate(`/detalle-cliente/${cliente.id}`)}
                                    >
                                        Creditos
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Clientes;
