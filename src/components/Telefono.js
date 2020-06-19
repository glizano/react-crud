import React, { useState, useEffect } from 'react';
import TelefonoService from '../services/TelefonoService';

import PersonaDataService from "../services/PersonaService";


const Telefono = (props) => {

    const [currentTelefono, setCurrentTelefono] = useState({
        id: null,
        persona: '',
        numero: '',
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

    const retrieveTelefono = (id) => {
        TelefonoService.get(id)
            .then(response => {
                setCurrentTelefono(response.data);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const validate = () => {
        let _errors = []
        Object.entries(currentTelefono).forEach(
            // if we have an error string set valid to false
            ([key, value]) => {
                !value && _errors.push(key + ' es un campo requerido')
            }
        );
        return _errors;

    }

    const updateTelefono = () => {
        var _errors = validate()
        setErrors(_errors);
        if (_errors.length === 0) {
            let d = {...currentTelefono};
            let _persona = {id:currentTelefono.persona}
            d.persona = _persona
            TelefonoService.update(d)
                .then(response => {
                    setMsg("Telefono actualizado correctamente. Volviendo a la lista en 3 segundos...");
                    console.log(response);
                    setTimeout( () => {
                        window.location.href = '/telefonos'; }, 3000 );
                })
                .catch(error => {
                    console.log(error);
                });
        }
        console.log(errors)
    };

    const deleteTelefono = () => {
        TelefonoService.remove(currentTelefono.id)
            .then(response => {
                setMsg("Telefono borrado correctamente.  Volviendo a la lista en 3 segundos...");
                console.log(response);
                setTimeout( () => {
                    window.location.href = '/telefonos'; }, 3000 );
            })
            .catch(error => {
                console.log(error);
            });
    };

    
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setCurrentTelefono({...currentTelefono, [name]: value});
    }
    
    useEffect(() => retrieveTelefono(props.match.params.id), []);
    
    return (
        <div>
                <div className="edit-form">
                    <h4>Telefono</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="persona">Persona</label>
                            <select className="form-control" id="persona" name="persona" value={currentTelefono.persona.id}
                            onChange={handleInputChange}>
                                <option value='' ></option>
                            {personas.map((persona, index) =>
                                <option value={persona.id} key={index}>{persona.nombre}</option>
                                )}
                            </select> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="numero">Numero:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="numero"
                                required
                                value={currentTelefono.numero}
                                onChange={handleInputChange}
                                name="numero"
                            />
                        </div>
                    </form>



                    <button className="badge badge-danger mr-2" onClick={deleteTelefono}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateTelefono}
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

export default Telefono;