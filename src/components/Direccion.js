import React, { useState, useEffect } from 'react';
import DireccionService from '../services/DireccionService';

import PersonaDataService from "../services/PersonaService";


const Direccion = (props) => {

    const [currentDireccion, setCurrentDireccion] = useState({
        id: null,
        persona: '',
        codigo_postal: '',
        otras_senas: '',
    });
    const [message, setMsg] = useState('');
    const [errors, setErrors] = useState([])
    const [personas, setPersonas] = useState([]);

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

    const retrieveDireccion = (id) => {
        DireccionService.get(id)
            .then(response => {
                setCurrentDireccion(response.data);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const validate = () => {
        let _errors = []
        Object.entries(currentDireccion).forEach(
            // if we have an error string set valid to false
            ([key, value]) => {
                !value && _errors.push(key + ' es un campo requerido')
            }
        );
        return _errors;

    }

    const updateDireccion = () => {
        var _errors = validate()
        setErrors(_errors);
        if (_errors.length === 0) {
            let d = {...currentDireccion};
            let _persona = {id:currentDireccion.persona}
            d.persona = _persona
            DireccionService.update(d)
                .then(response => {
                    setMsg("Direccion actualizada correctamente. Volviendo a la lista en 3 segundos...");
                    console.log(response);
                    setTimeout( () => {
                        window.location.href = '/direcciones'; }, 3000 );
                })
                .catch(error => {
                    console.log(error);
                });
        }
        console.log(errors)
    };

    const deleteDireccion = () => {
        DireccionService.remove(currentDireccion.id)
            .then(response => {
                setMsg("Direccion borrada correctamente.  Volviendo a la lista en 3 segundos...");
                console.log(response);
                setTimeout( () => {
                    window.location.href = '/direcciones'; }, 3000 );
            })
            .catch(error => {
                console.log(error);
            });
    };

    
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setCurrentDireccion({...currentDireccion, [name]: value});
    }
    
    useEffect(() => retrieveDireccion(props.match.params.id), []);
    
    return (
        <div>
                <div className="edit-form">
                    <h4>Direccion</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="persona">Persona</label>
                            <select className="form-control" id="persona" name="persona" value={currentDireccion.persona.id}
                            onChange={handleInputChange}>
                                <option value='' ></option>
                            {personas.map((persona, index) =>
                                <option value={persona.id} key={index}>{persona.nombre}</option>
                                )}
                            </select> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="codigo_postal">Codigo Postal:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="codigo_postal"
                                required
                                value={currentDireccion.codigo_postal}
                                onChange={handleInputChange}
                                name="codigo_postal"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="otras_senas">Otras Señas</label>
                            <input
                                type="text"
                                className="form-control"
                                id="otras_senas"
                                required
                                value={currentDireccion.otras_senas}
                                onChange={handleInputChange}
                                name="otras_senas"
                            />
                        </div>
                    </form>



                    <button className="badge badge-danger mr-2" onClick={deleteDireccion}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateDireccion}
                    >
                        Update
                    </button>
                    {errors.length >0 ? 
                        <ul className="text-danger">
                            {errors.map((error, index) =>
                                <li key={index}>{error}</li>
                            )}
                        </ul>
                        : 
                        <p>{message}</p>
                    }
                </div>
        </div>
    );
}

export default Direccion;