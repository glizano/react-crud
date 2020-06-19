import React, { useState, useEffect } from "react";
import PersonaDataService from "../services/PersonaService";
import { Link } from "react-router-dom"

const PersonaList = () => {
    const [personas, setPersonas] = useState([]);
    const [currentPersona, setCurrentPersona] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);  
    const [message, setMsg] = useState('');

    const retrivePersonas = () => {
        PersonaDataService.getAll()
            .then(response => {
                setPersonas(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    };
    useEffect(() => {
        retrivePersonas();
    }, []);

    const setActivePersona = (persona, index) => {
        setCurrentPersona(persona);
        setCurrentIndex(index);
    };

    const deletePersona = () => {
        PersonaDataService.remove(currentPersona.id)
            .then(response => {
                setCurrentPersona(response.data);
                console.log(response);
                setMsg("Persona borrada correctamente. Recargando la lista...");
                setTimeout( () => {
                    window.location.reload(); }, 2000 );
                
            })
            .catch(error => {
                alert('error: persona referenciada')
                console.log(error);
            });
    }

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


              <Link to={"/add"} className="btn btn-success mt-5">
                Incluir personas
              </Link>


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

                        <button className="badge badge-danger mr-2" onClick={deletePersona}>
                            Delete
                        </button>



                        <Link
                            to={"/direcciones/add?persona=" + currentPersona.id}
                            className="badge badge-secondary"
                        >
                            Add direccion
                        </Link>

                        <Link
                            to={"/telefonos/add?persona=" + currentPersona.id}
                            className="badge badge-info"
                        >
                            Add telefono
                        </Link>

                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Seleccione una persona ...</p>
                            <p>{message}</p>
                        </div>
                    )}
            </div>
        </div>
    );


};
export default PersonaList;