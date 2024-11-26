import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Chart, registerables } from "chart.js";


// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

const Dashboard = () => {
    const [clientes, setClientes] = useState([]); // Estado para los clientes
    const [error, setError] = useState(""); // Estado para errores
    const chartRef = useRef(null); // Referencia al canvas
    const chartInstance = useRef(null); // Referencia a la instancia de Chart.js
    const token = localStorage.getItem("token"); // Token de autenticación
    const navigate = useNavigate(); // Navegación

    /**
     * Función para cargar los datos de la API
     */
    const handleDashboard = async () => {
        setError(""); // Resetea errores
        try {
            const response = await axios.get("http://localhost:8000/api/clientes", {
                headers: {
                    Authorization: `Token ${token}`, // Agrega el token al encabezado para autenticación
                },
            });
            setClientes(response.data); // Guarda los datos de la API en el estado
        } catch (err) {
            setError(err.response?.data?.error || "Error al cargar los clientes");
        }
    };

    /**
     * Función para procesar los datos y crear la gráfica
     */
    const renderChart = () => {
        // Destruir la instancia existente de Chart si ya existe
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Procesar datos: contar clientes por género
        const generoCounts = clientes.reduce(
            (acc, cliente) => {
                if (cliente.genero === "M") acc.M += 1;
                if (cliente.genero === "F") acc.F += 1;
                return acc;
            },
            { M: 0, F: 0 }
        );

        // Datos para la gráfica
        const data = {
            labels: ["Masculino", "Femenino"], // Etiquetas de la gráfica
            datasets: [
                {
                    label: "Cantidad de Clientes por Género",
                    data: [generoCounts.M, generoCounts.F], // Datos de clientes por género
                    backgroundColor: ["#4caf50", "#ff4081"], // Colores de las barras
                },
            ],
        };

        // Configuración de la gráfica
        const config = {
            type: "bar",
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        };

        // Crear una nueva instancia de Chart.js
        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, config);
    };

    // Llama a la API al montar el componente
    useEffect(() => {
        handleDashboard();
    }, []);

    // Renderiza la gráfica cuando los datos de clientes están disponibles
    useEffect(() => {
        if (clientes.length > 0) {
            renderChart();
        }
    }, [clientes]);

    // Limpiar la instancia de la gráfica al desmontar el componente
    useEffect(() => {
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div className="card " style={{width: "25rem", display:"flex", justifyContent:"center"}}>
                <div className="card-body">
                    <div className="container mt-4">
                        {/* Mostrar errores si existen */}
                        {error && <p className="text-danger">{error}</p>}

                        {/* Contenedor para la gráfica */}
                        <div className="chart-container">
                            <canvas id="chart" ref={chartRef}></canvas>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default Dashboard;
