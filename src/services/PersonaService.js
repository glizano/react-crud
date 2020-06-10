import http from '../http-common';

const getAll = () => http.get('/personas');

const get = (id) => http.get(`/personas/${id}`);

const create = (data) => http.post('/personas',data);

const update = (data) => http.put('/personas',data);

const remove = (id) => http.delete(`/personas/${id}`);

export default {
    getAll,
    get,
    create,
    update,
    remove
}