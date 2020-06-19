import React, { useState, useEffect } from 'react';
import PersonaService from '../services/PersonaService';
import { Link } from "react-router-dom"


const AddPersona = (props) => {

    const [persona, setPersona] = useState({
        identificacion: '',
        nombre: '',
        fecha: '',
    });
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPersona({ ...persona, [name]: value });
    }

    const validate = () => {
        let _errors = []
        Object.entries(persona).forEach(
            // if we have an error string set valid to false
            ([key, value]) => {
                !value && _errors.push(key + ' es un campo requerido')
            }
        );
        return _errors;

    }

    const savePersona = () => {
        let _errors = validate()
        setErrors(_errors);
        if (_errors.length === 0) {

            PersonaService.create(persona)
                .then(response => {
                    newPersona()
                    setSubmitted(true);
                    console.log(response);
                })
                .catch(error => {
                    let _errors = ['Ya existe la identificacion']
                    setErrors(_errors);
                    console.log(error);
                });
        }
    };

    const newPersona = () => {
        setPersona({
            identificacion: '',
            nombre: '',
            fecha: '',
            errors: []

        });
        setSubmitted(false);
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Enviado correctamente!</h4>
                    <button className="btn btn-success" onClick={newPersona}>
                        Add
                    </button>
                    <Link to={"/"} className="btn btn-primary">
                        Ir a la lista
                    </Link>
                </div>
            ) : (
                    <div>


                        <div className="form-group">
                            <label htmlFor="identificacion">Identificacion</label>
                            <input
                                type="number" max="999999999" 
                                className="form-control"
                                id="identificacion"
                                required
                                value={persona.identificacion}
                                onChange={handleInputChange}
                                name="identificacion"
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text" maxLength="255"
                                className="form-control"
                                id="nombre"
                                required
                                value={persona.nombre}
                                onChange={handleInputChange}
                                name="nombre"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fecha"
                                required
                                value={persona.fecha}
                                onChange={handleInputChange}
                                name="fecha"
                            />
                        </div>

                        <button onClick={savePersona} className="btn btn-success" type='submit'>
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

export default AddPersona;