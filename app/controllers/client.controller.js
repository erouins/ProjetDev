const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clientService, userService } = require('../services');
const logger = require('../config/logger');
const stripe = require('stripe')('sk_test_51MEZJPLfKONO35vsrFW0xG35hpGHDEsQxITecI2UimWSjM28TEqZqOSBKwC3SJKG7vWX9V49N7wI1OYJwAgDrAgc005NgDPZsJ');
const endpointSecret = 'whsec_BmV5tgzRI7el1fukkqWa35fDaEl2cTTE';

const create =  catchAsync(async (req, res) => {
    userid = req.body.userId
    profil = req.body.profil
    const client = await clientService.createClientProfil(userid, profil);
    res.status(httpStatus.CREATED).send(client);
});

const getClientOrders = catchAsync(async (req, res) => {
    const orders = await clientService.getClientOrders(req.params.clientId);
    console.log(orders.createdAt)
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

const createCheckoutSession = catchAsync(async (req, res) => {
    const order = await clientService.getOrderById(req.body.id);

    let totalPrice  = 0
    order.menus.forEach((element) => {
    totalPrice += element.price;
    });
    order.articles.forEach((element) => {
    totalPrice += element.price;
    });
    totalPrice = totalPrice.toFixed(2);

    console.log("totalPrice", totalPrice)
   

   
    const product = await stripe.products.create({
        name: 'Commande N°' + order.id.slice(-5),
      });

    const pricee = await stripe.prices.create({
        unit_amount: totalPrice * 100,
        currency: 'eur',
        product: product.id,
      });
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
            price: pricee.id, 
            quantity: 1
        }
      ],
      mode: 'payment',
      success_url: 'http://localhost:8080/clients/order',
      cancel_url: 'http://localhost:8080/clients/restaurants',
      metadata: {
        order_id: order.id
      }
    });
     res.status(httpStatus.OK).send(session);
  });

const clientPayOrder = catchAsync(async (request, res) => {
    
      const order = await clientService.markOrderAsPaid(request.body.id);
      console.log("envoyer token ici")
      res.status(httpStatus.OK).send(order);

  });
const deleteOrderById =  catchAsync(async (req, res) => {
    const orderId = req.params.orderId;
    logger.debug("[ ] [CONTROLLER]  Delete menu by Id: " + orderId);
    await clientService.deleteOrderById(req.params.orderId);
    res.status(httpStatus.OK)
})

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
    deleteOrderById,
    createCheckoutSession,
    clientPayOrder
};
