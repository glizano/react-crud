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
    const [errors, setErrors] = useState([])

    const validate = () => {
        let errors = []
        Object.entries(currentPersona).forEach(
            // if we have an error string set valid to false
            ([key, value]) => {
                console.log(value)
                if(key!=='id')
                    !value && errors.push(key + ' es un campo requerido')
            }
        );
        setErrors(errors)

    }
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
        validate()
        if (errors.length == 0) {
            PersonaService.update(currentPersona)
                .then(response => {
                    setCurrentPersona(response.data);
                    setMsg("Persona actualizada correctamente. Volviendo a la lista en 3 segundos...");
                    console.log(response);
                    setTimeout( () => {
                        window.location.href = '/'; }, 3000 );
                })
                .catch(error => {
                    console.log(error);
                });
        }
        console.log(errors)
    };

    const deletePersona = () => {
        PersonaService.remove(currentPersona.id)
            .then(response => {
                setCurrentPersona(response.data);
                setMsg("Persona borrada correctamente.  Volviendo a la lista en 3 segundos...");
                console.log(response);
                setTimeout( () => {
                    window.location.href = '/'; }, 3000 );
            })
            .catch(error => {
                alert('error: persona referenciada')
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
                <div className="edit-form">
                    <h4>Persona</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="identificacion">Identificacion</label>
                            <input
                                type="number" max="999999999" 
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
                                type="text" maxLength="255" 
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
                                type="date"
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

export default Persona;