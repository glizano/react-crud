import http from '../http-common';

const getAll = () => http.get('/telefonos');

const get = (id) => http.get(`/telefonos/${id}`);

const create = (data) => http.post('/telefonos',data);

const update = (data) => http.put('/telefonoss',data);

const remove = (id) => http.delete(`/telefonos/${id}`);

export default {
    getAll,
    get,
    create,
    update,
    remove
}