import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import PersonaList from './components/PersonaList';
import AddPersona from './components/AddPersona';
import Persona from './components/Persona';

import DireccionList from './components/DireccionList';
import TelefonoList from './components/TelefonoList';
import AddDireccion from './components/AddDireccion';
import AddTelefono from './components/AddTelefono';
import Telefono from './components/Telefono';
import Direccion from './components/Direccion';



function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            <img src="https://cdn3.iconfinder.com/data/icons/ui-outline-1/100/ui_29-512.png" width="30" height="30" alt=""/>
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/personas"} className="nav-link">
                Personas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/direcciones"} className="nav-link">
              Direcciones
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/telefonos"} className="nav-link">
              Telefonos
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/personas"]} component={PersonaList} />
            <Route exact path="/add" component={AddPersona} />
            <Route path="/personas/:id" component={Persona} />


            <Route exact path={"/direcciones"} component={DireccionList} />
            <Route exact path="/direcciones/add" component={AddDireccion} />
            <Route path="/direcciones/:id" component={Direccion} />

            <Route exact path={"/telefonos"} component={TelefonoList} />
            <Route exact path="/telefonos/add" component={AddTelefono} />
            <Route path="/telefonos/:id" component={Telefono} />

          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;
