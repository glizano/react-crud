import React, { useState, useEffect } from 'react';
import DireccionService from '../services/DireccionService';
import { Link } from "react-router-dom"

import PersonaDataService from "../services/PersonaService";

const AddDireccion = (props) => {

    const pId = new URLSearchParams(props.location.search).get('persona');

    const [direccion, setDireccion] = useState({
        persona :'' ,
        codigo_postal: '',
        otras_senas:'',
    });
    const [errors, setErrors] = useState([])
    const [personas, setPersonas] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const retrivePersonas = () => {
        PersonaDataService.getAll()
            .then(response => {
                setPersonas(response.data);
                setDireccion({
                    persona: pId?pId:'' ,
                    codigo_postal: '',
                    otras_senas:'',
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
        setDireccion({ ...direccion, [name]: value });
    }

    const validate = () => {
        let _errors = []
        Object.entries(direccion).forEach(
            // if we have an error string set valid to false
            ([key, value]) => {
                !value && _errors.push(key + ' es un campo requerido')
            }
        );
        return _errors;

    }

    const saveDireccion = () => {
        var _errors = validate()
        setErrors(_errors);
        if (_errors.length === 0) {
            let d = {...direccion};
            d.persona = {id:direccion.persona}
            DireccionService.create(d)
                .then(response => {
                    newDireccion()
                    setSubmitted(true);
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const newDireccion = () => {
        setDireccion({
            persona: '',
            codigo_postal: '',
            otras_senas:'',

        });
        setSubmitted(false);
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Enviado correctamente!</h4>
                    <button className="btn btn-success" onClick={newDireccion}>
                        Add
                    </button>
                    <Link to={"/direcciones"} className="btn btn-primary">
                        Ir a la lista
                    </Link>
                </div>
            ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="persona">Persona</label>
                            <select className="form-control" id="persona" name="persona" value={direccion.persona}
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
                                value={direccion.codigo_postal}
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
                                value={direccion.otras_senas}
                                onChange={handleInputChange}
                                name="otras_senas"
                            />
                        </div>

                        <button onClick={saveDireccion} className="btn btn-success" type='submit'>
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

export default AddDireccion;