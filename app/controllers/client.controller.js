const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clientService, userService } = require('../services');
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

  const getClientHistorical = catchAsync(async (req, res) => {
    const orders = await clientService.getClientHistorical(req.params.clientId);
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
    const client = await clientService.getClientById(req.params.clientId);
    res.status(httpStatus.OK).send(client);
});




module.exports = {
    create,
    createOrder,
    getClientOrders,
    getClientHistorical,
    updateClientProfil,
    getClientProfil,
    
};
