import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import ClientClusteringChart from "../../components/kmeans/tabs";

const Iniciador = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate("");
    const handleIniciador = () => {
        navigate('');
    }


    return (
        <div>
            <Navbar></Navbar>
            
            <div className="container mt-4">
            <ClientClusteringChart/>

            </div>

        </div>

    );
};
export default Iniciador