import React, { useState, useEffect } from "react";
import TelefonoDataService from "../services/TelefonoService";
import { Link } from "react-router-dom"

const TelefonoList = () => {
    const [telefonos, setTelefonos] = useState([]);
    const [currentTelefono, setCurrentTelefono] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);  
    const [message, setMsg] = useState('');

    const retriveTelefonos = () => {
        TelefonoDataService.getAll()
            .then(response => {
                setTelefonos(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    };
    useEffect(() => {
        retriveTelefonos();
    }, []);

    const setActiveTelefono = (telefono, index) => {
        setCurrentTelefono(telefono);
        setCurrentIndex(index);
    };

    const deleteTelefono = () => {
        TelefonoDataService.remove(currentTelefono.id)
            .then(response => {
                setCurrentTelefono(response.data);
                console.log(response);
                setMsg("Telefono borrado correctamente. Recargando la lista...");
                setTimeout( () => {
                    window.location.reload(); }, 2000 );
                
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="list row">

            <div className="col-md-6">
                <h4>Lista de Telefonos</h4>

                <ul className="list-group">
                    {telefonos &&
                        telefonos.map((telefono, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveTelefono(telefono, index)}
                                key={index}
                            >
                                {telefono.persona.nombre + ' - ' + telefono.numero}
                            </li>
                        ))}
                </ul>


              <Link to={"/telefonos/add"} className="btn btn-success mt-5">
                Incluir telefonos
              </Link>


            </div>
            <div className="col-md-6">
                {currentTelefono ? (
                    <div>
                        <h4>Telefono</h4>
                        <div>
                            <label>
                                <strong>Id:</strong>
                            </label>{" "}
                            {currentTelefono.id}
                        </div>
                        <div>
                            <label>
                                <strong>Persona:</strong>
                            </label>{" "}
                            {currentTelefono.persona.nombre}
                        </div>
                        <div>
                            <label>
                                <strong>Numero:</strong>
                            </label>{" "}
                            {currentTelefono.numero}
                        </div>

                        <Link
                            to={"/telefonos/" + currentTelefono.id}
                            className="badge b adge-warning"
                        >
                            Edit
                        </Link>

                        <button className="badge badge-danger mr-2" onClick={deleteTelefono}>
                            Delete
                        </button>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Seleccione una telefono ...</p>
                            <p>{message}</p>
                        </div>
                    )}
            </div>
        </div>
    );


};
export default TelefonoList;