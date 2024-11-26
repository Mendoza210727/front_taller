import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Auth/Login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome.jsx';
import Register from './pages/Auth/Register.jsx';
import Clientes from './pages/Clientes/Clientes.jsx';
import ClienteCreate from './pages/Clientes/Clientes_create.jsx';
import ClienteDetalle from './pages/Clientes/cliente_detalle.jsx';
import Iniciador from './pages/Kmean/iniciador.jsx';





function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/welcome'  element = {<Welcome/>}/>
          <Route path='/register' element={<Register/>} />
          <Route path='/clientes' element = {<Clientes/>} />
          <Route path='/cliente/create' element ={<ClienteCreate/>} />
          <Route path="/detalle-cliente/:fk" element={<ClienteDetalle />} />
          <Route path='/Dashboard' />
          <Route path='/iniciador' element ={<Iniciador/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
