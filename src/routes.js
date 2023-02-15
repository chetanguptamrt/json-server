const route = require('express').Router();
const service = require('./service');

route.get('/', service.getAllItems);
route.get('/:item', service.getItems);
route.get('/:item/:id', service.getItemById);
route.post('/:item', service.addItem);
route.put('/:item/:id', service.replaceItemById);
route.patch('/:item/:id', service.updateItemById);
route.delete('/:item/:id', service.deleteItemById);
route.delete('/reset', service.resetAllItems);

module.exports = route;