import React, { useEffect, useState } from "react";
import Dashboard from "./Dasboard";
import Clientes from "./Clientes/Clientes";
import Navbar from "./Navbar";


const Welcome = () => {
  

  return (
    <div>
      <Navbar></Navbar>
      <Dashboard></Dashboard>
      <div className="container mt-5">
        <div className="text-center mt-4">
  
        </div>
      </div>
    </div>

  );
};

export default Welcome;
