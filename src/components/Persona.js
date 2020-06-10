import React, { useState, useEffect } from 'react';
import PersonaService from '../services/PersonaService';


const Persona = (props) => {

    const [currentPersona, setCurrentPersona] = useState({
        id: null,
        identificacion: '',
        nombre: '',
        fecha: '',
    });
    const [message, setMsg] = useState('');

    const retrievePersona = (id) => {
        PersonaService.get(id)
            .then(response => {
                setCurrentPersona(response.data);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const updatePersona = () => {
        PersonaService.update(currentPersona)
            .then(response => {
                setCurrentPersona(response.data);
                setMsg("Persona actualizada correctamente");
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const deletePersona = () => {
        PersonaService.remove(currentPersona.id)
            .then(response => {
                setCurrentPersona(response.data);
                setMsg("Persona borrada correctamente");
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setCurrentPersona({...currentPersona, [name]: value});
    }
    
    useEffect(() => retrievePersona(props.match.params.id), []);
    
    return (
        <div>
            {currentPersona ? (
                <div className="edit-form">
                    <h4>Persona</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="identificacion">Identificacion</label>
                            <input
                                type="text"
                                className="form-control"
                                id="identificacion"
                                name="identificacion"
                                value={currentPersona.identificacion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                value={currentPersona.nombre}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fecha">Fecha</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fecha"
                                name="fecha"
                                value={currentPersona.fecha}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>



                    <button className="badge badge-danger mr-2" onClick={deletePersona}>
                        Delete
            </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updatePersona}
                    >
                        Update
            </button>
                    <p>{message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Seleccione una persona...</p>
                    </div>
                )
            }
        </div>
    );
}

export default Persona;