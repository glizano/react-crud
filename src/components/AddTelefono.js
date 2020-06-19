import React, { useState, useEffect } from 'react';
import TelefonoService from '../services/TelefonoService';
import { Link } from "react-router-dom"

import PersonaDataService from "../services/PersonaService";

const AddTelefono = (props) => {
    const pId = new URLSearchParams(props.location.search).get('persona');

    const [telefono, setTelefono] = useState({
        persona: '',
        numero: '',
    });
    const [errors, setErrors] = useState([])
    const [personas, setPersonas] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const retrivePersonas = () => {
        PersonaDataService.getAll()
            .then(response => {
                setPersonas(response.data);
                setTelefono({
                    persona: pId?pId:'' ,
                    numero: '',
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    };
    useEffect(() => {
        retrivePersonas();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTelefono({ ...telefono, [name]: value });
    }

    const validate = () => {
        let _errors = []
        Object.entries(telefono).forEach(
            // if we have an error string set valid to false
            ([key, value]) => {
                !value && _errors.push(key + ' es un campo requerido')
            }
        );
        return _errors;

    }

    const saveTelefono = () => {
        var _errors = validate()
        setErrors(_errors);
        if (_errors.length === 0) {
            let d = {...telefono};
            d.persona = {id:telefono.persona}
            TelefonoService.create(d)
                .then(response => {
                    newTelefono()
                    setSubmitted(true);
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const newTelefono = () => {
        setTelefono({
            persona: '',
            numero: '',

        });
        setSubmitted(false);
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Enviado correctamente!</h4>
                    <button className="btn btn-success" onClick={newTelefono}>
                        Add
                    </button>
                    <Link to={"/telefonos"} className="btn btn-primary">
                        Ir a la lista
                    </Link>
                </div>
            ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="persona">Persona</label>
                            <select className="form-control" id="persona" name="persona" value={telefono.persona}
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
                                value={telefono.numero}
                                onChange={handleInputChange}
                                name="numero"
                            />
                        </div>

                        <button onClick={saveTelefono} className="btn btn-success" type='submit'>
                            Submit
                        </button>


                        {errors &&
                            <ul className="text-danger">
                                {errors.map((error, index) =>
                                    <li key={index}>{error}</li>
                                )}
                            </ul>
                        }
                    </div>
                )}
        </div>
    );
};

export default AddTelefono;