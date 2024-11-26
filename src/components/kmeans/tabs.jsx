import React, { useEffect, useState } from "react";
import axios from "axios";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
} from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, LinearScale, PointElement);

/**
 * Componente que consume la API `clientes/clustering/` y muestra un gráfico de dispersión.
 */
const ClientClusteringChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/clientes/clustering/");
      const data = response.data;

      // Procesar los datos para el gráfico
      const datasets = [
        {
          label: "BUEN_PAGADOR",
          data: data
            .filter((item) => item.cluster_grupo === "BUEN_PAGADOR")
            .map((item) => ({
              x: item.promedio_dias_atraso,
              y: item.porcentaje_pagos_atrasados,
            })),
          backgroundColor: "rgba(75, 192, 192, 0.6)", // Color para "BUEN_PAGADOR"
        },
        {
          label: "MAL_PAGADOR",
          data: data
            .filter((item) => item.cluster_grupo === "MAL_PAGADOR")
            .map((item) => ({
              x: item.promedio_dias_atraso,
              y: item.porcentaje_pagos_atrasados,
            })),
          backgroundColor: "rgba(255, 99, 132, 0.6)", // Color para "MAL_PAGADOR"
        },
      ];

      setChartData({
        datasets,
      });
    } catch (err) {
      setError("Error al cargar los datos de la API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  // Opciones de configuración del gráfico
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Clustering de Clientes: Gráfico de Dispersión",
        font: {
          size: 18,
        },
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Promedio de Días de Atraso",
        },
      },
      y: {
        title: {
          display: true,
          text: "Porcentaje de Pagos Atrasados (%)",
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default ClientClusteringChart;
