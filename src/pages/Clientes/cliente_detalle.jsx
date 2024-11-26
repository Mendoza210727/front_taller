import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Dashboard from "../Navbar";

const ClienteDetalle = () => {
    const [detalle, setDetalle] = useState([]); // Estado para almacenar detalles del cliente
    const [error, setError] = useState(""); // Estado para errores
    const token = localStorage.getItem("token"); // Obtiene el token desde el localStorage
    const navigate = useNavigate(); // Navegación entre rutas
    const { fk } = useParams(); // Obtiene el parámetro `fk` de la URL

    /**
     * Función para obtener los detalles del cliente desde la API.
     */
    const handleDetalle = async () => {
        try {
            setError(""); // Limpia cualquier error previo
            // Solicitud GET con el token en los encabezados
            const response = await axios.get(
                `http://localhost:8000/api/detalle-cliente/${fk}`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            setDetalle(response.data); // Actualiza el estado con los datos recibidos
        } catch (err) {
            // Maneja errores y asigna un mensaje de error
            setError(err.response?.data?.error || "Error al cargar los detalles del cliente");
        }
    };

    // Llama a la función `handleDetalle` cuando se monta el componente
    useEffect(() => {
        handleDetalle();
    }, [fk]);

    return (
        <div>
            {/* Renderiza el componente del dashboard */}
            <Dashboard />

            {/* Contenedor principal */}
            <div className="container mt-4">
                {/* Muestra un mensaje de error si existe */}
                {error && <p className="text-danger">{error}</p>}

                {/* Tabla para mostrar los detalles del cliente */}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Detalle</th>
                            <th scope="col">Ocupación</th>
                            <th scope="col">Fecha Inicio Ocupación</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Renderiza las filas de la tabla con los datos de los detalles */}
                        {detalle.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.detalle}</td>
                                <td>{item.ocupacion}</td>
                                <td>{item.fecha_inicio_ocupacion}</td>
                                <td>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClienteDetalle;
