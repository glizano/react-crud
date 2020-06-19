import React, { useState, useEffect } from "react";
import DireccionDataService from "../services/DireccionService";
import { Link } from "react-router-dom"

const DireccionList = () => {
    const [direcciones, setDirecciones] = useState([]);
    const [currentDireccion, setCurrentDireccion] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);  
    const [message, setMsg] = useState('');

    const retriveDirecciones = () => {
        DireccionDataService.getAll()
            .then(response => {
                setDirecciones(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    };
    useEffect(() => {
        retriveDirecciones();
    }, []);

    const setActiveDireccion = (direccion, index) => {
        setCurrentDireccion(direccion);
        setCurrentIndex(index);
    };

    const deleteDireccion = () => {
        DireccionDataService.remove(currentDireccion.id)
            .then(response => {
                setCurrentDireccion(response.data);
                console.log(response);
                setMsg("Direccion borrada correctamente. Recargando la lista...");
                setTimeout( () => {
                    window.location.reload(); }, 2000 );
                
            })
            .catch(error => {
                alert('error: direccion referenciada')
                console.log(error);
            });
    }

    return (
        <div className="list row">

            <div className="col-md-6">
                <h4>Lista de Direcciones</h4>

                <ul className="list-group">
                    {direcciones &&
                        direcciones.map((direccion, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveDireccion(direccion, index)}
                                key={index}
                            >
                                {direccion.persona.nombre + ' - ' + direccion.codigo_postal}
                            </li>
                        ))}
                </ul>


              <Link to={"/direcciones/add"} className="btn btn-success mt-5">
                Incluir direcciones
              </Link>


            </div>
            <div className="col-md-6">
                {currentDireccion ? (
                    <div>
                        <h4>Direccion</h4>
                        <div>
                            <label>
                                <strong>Id:</strong>
                            </label>{" "}
                            {currentDireccion.id}
                        </div>
                        <div>
                            <label>
                                <strong>Persona:</strong>
                            </label>{" "}
                            {currentDireccion.persona.nombre}
                        </div>
                        <div>
                            <label>
                                <strong>Codigo postal:</strong>
                            </label>{" "}
                            {currentDireccion.codigo_postal}
                        </div>
                        <div>
                            <label>
                                <strong>Otras señas:</strong>
                            </label>{" "}
                            {currentDireccion.otras_senas}
                        </div>

                        <Link
                            to={"/direcciones/" + currentDireccion.id}
                            className="badge b adge-warning"
                        >
                            Edit
                        </Link>

                        <button className="badge badge-danger mr-2" onClick={deleteDireccion}>
                            Delete
                        </button>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Seleccione una direccion ...</p>
                            <p>{message}</p>
                        </div>
                    )}
            </div>
        </div>
    );


};
export default DireccionList;