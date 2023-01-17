const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { deliveryService } = require('../services');
const logger = require('../config/logger');

const create =  catchAsync(async (req, res) => {
    userid = req.body.userId
    profil = req.body.profil
    const delivery = await deliveryService.createDeliveryProfil(userid, profil);
    res.status(httpStatus.CREATED).send(delivery);
});

const updateDeliveryProfil = catchAsync(async (req, res) => {
    const deliveryId = req.params.deliveryId;
    const profil = await deliveryService.updateDeliveryProfil(deliveryId, req.body.profil);
    if (profil != null){
        res.status(httpStatus.CREATED).send(profil); 
        }else{
        res.status(httpStatus.NOT_FOUND).send({error : "Profil do not exists"}); 
        }
   
});

const getDeliveryProfil = catchAsync(async (req, res) => {
    const delivery = await deliveryService.getDeliveryProfil(req.params.deliveryId);
    res.status(httpStatus.OK).send(delivery);
});

const getPendingOrders = catchAsync(async (req, res) => {
    const orders = await deliveryService.getPendingOrders();
    res.status(httpStatus.OK).send(orders);
});

const getDeliveryHistorical = catchAsync(async (req, res) => {
    const orders = await deliveryService.getDeliveryHistorical(req.params.deliveryId);
    res.status(httpStatus.OK).send(orders);
});

const getDeliveryOrders = catchAsync(async (req, res) => {
    const orders = await deliveryService.getDeliveryOrders(req.params.deliveryId);
    if (orders != null){
        res.status(httpStatus.OK).send(orders);
        }else{
        res.status(httpStatus.NO_CONTENT).send({error : "Deliverer doesn't have any orders"}); 
        }
   
});




module.exports = {
    create,
    updateDeliveryProfil,
    getDeliveryHistorical,
    getDeliveryProfil,
    getPendingOrders,
    getDeliveryOrders
};
