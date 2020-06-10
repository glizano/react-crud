import React, { useState, useEffect } from 'react';
import PersonaService from '../services/PersonaService';
import { BrowserRouter as Link } from "react-router-dom";


const PersonaList = () => {

    const [personas, setPersonas] = useState([]);
    const [currentPersona, setCurrentPersona] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const retrievePersonas = () => {
        PersonaService.getAll()
            .then(response => {
                setPersonas(response.data);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const setActivePersona = (persona, index) => {
        setCurrentPersona(persona);
        setCurrentIndex(index);
    }

    useEffect(() => retrievePersonas(), []);

    return (
        <div className="list row">

            <div className="col-md-6">
                <h4>Lista de Personas</h4>
                <ul className="list-group">
                    {personas &&
                        personas.map((persona, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActivePersona(persona, index)}
                                key={index}
                            >
                                {persona.nombre}
                            </li>
                        ))}
                </ul>
            </div>

            <div className="col-md-6">
                {currentPersona ? (
                    <div>
                        <h4>Persona</h4>
                        <div>
                            <label>
                                <strong>Identificación:</strong>
                            </label>{" "}
                            {currentPersona.identificacion}
                        </div>
                        <div>
                            <label>
                                <strong>Nombre:</strong>
                            </label>{" "}
                            {currentPersona.nombre}
                        </div>
                        <div>
                            <label>
                                <strong>Fecha:</strong>
                            </label>{" "}
                            {currentPersona.fecha}
                        </div>

                        <Link
                        to={"/personas/" + currentPersona.id}
                        className="badge badge-warning"
                        >
                        Edit
                        </Link>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Seleccione una persona ...</p>
                        </div>
                    )}
            </div>
        </div>
    );

};

export default PersonaList;
