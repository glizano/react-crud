import http from '../http-common';

const getAll = () => http.get('/direcciones');

const get = (id) => http.get(`/direcciones/${id}`);

const create = (data) => http.post('/direcciones',data);

const update = (data) => http.put('/direcciones',data);

const remove = (id) => http.delete(`/direcciones/${id}`);

export default {
    getAll,
    get,
    create,
    update,
    remove
}