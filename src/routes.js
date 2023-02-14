const route = require('express').Router();
const service = require('./service');

route.get('/', service.getAllItems)
route.get('/:item', service.getItems)
route.get('/:item/:id', service.getItemById)
route.post('/:item', service.addItem)
route.put('/:item/:id')
route.patch('/:item/:id')
route.delete('/:item/:id')

module.exports = route