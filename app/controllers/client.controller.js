const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clientService } = require('../services');
const logger = require('../config/logger');

const create =  catchAsync(async (req, res) => {
    userid = req.body.userId
    profil = req.body.profil
    const client = await clientService.createClientProfil(userid, profil);
    res.status(httpStatus.CREATED).send(client);
});

const getClientOrders = catchAsync(async (req, res) => {
    const orders = await clientService.getClientOrders(req.params.clientId);
    res.status(httpStatus.OK).send(orders);
  });

const createOrder = catchAsync(async (req, res) => {
    const order = await clientService.createClientOrder(req.body.order);
    res.status(httpStatus.CREATED).send(order); 
});

const updateClientProfil = catchAsync(async (req, res) => {
    const clientId = req.params.clientId;
    const profil = await clientService.updateClientProfil(clientId, req.body.profil);
    res.status(httpStatus.CREATED).send(profil); 
});

const getClientProfil = catchAsync(async (req, res) => {
    const client = await clientService.getClientProfil(req.params.clientId);
    res.status(httpStatus.OK).send(client);
});
const updateOrder = catchAsync(async (req, res) => {
    newOrder = req.body.order
    const order = await clientService.updateOrder(req.body.orderId, newOrder);
    res.status(httpStatus.OK).send(order);
});



module.exports = {
    create,
    createOrder,
    getClientOrders,
    updateClientProfil,
    getClientProfil,
    updateOrder,
};
