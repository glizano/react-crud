import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import PersonaList from './components/PersonaList';
import AddPersona from './components/AddPersona';
import Persona from './components/Persona';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={['/','/personas']} component={PersonaList} />
        <Route exact path={['/personas/add']} component={AddPersona} />
        <Route exact path={['/personas/:id']} component={Persona} />

      </Switch>
    </Router>
  );
}

export default App;
