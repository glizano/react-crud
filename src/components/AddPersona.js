import React, { useState, useEffect } from 'react';
import PersonaService from '../services/PersonaService';


const AddPersona = (props) => {

    const [persona, setPersona] = useState({
        id: null,
        identificacion: '',
        nombre: '',
        fecha: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPersona({ ...persona, [name]: value });
    }

    const savePersona = () => {
        PersonaService.create(persona)
            .then(response => {
                setPersona(response.data);
                setSubmitted(true);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const newPersona = () => {
        setPersona({
            id: null,
            identificacion: '',
            nombre: '',
            fecha: '',
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
                </div>
            ) : (
                    <div>


                        <div className="form-group">
                            <label htmlFor="identificacion">Identificacion</label>
                            <input
                                type="text"
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
                                type="text"
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
                                type="text"
                                className="form-control"
                                id="fecha"
                                required
                                value={persona.fecha}
                                onChange={handleInputChange}
                                name="fecha"
                            />
                        </div>

                        <button onClick={savePersona} className="btn btn-success">
                            Submit
        </button>
                    </div>
                )}
        </div>
    );
};

export default AddPersona;