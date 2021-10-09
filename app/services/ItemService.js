import http from '../http-common';

const create = (data) => http.post('/items', data);

const get = (id) => http.get(`/items/${id}`);

const getAll = () => http.get('/items');

const update = (id, data) => http.put(`/items/${id}`, data);

const remove = (id) => http.delete(`/items/${id}`);

const ItemService = {
  create,
  get,
  getAll,
  update,
  remove,
};

export default ItemService;
