const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clientService } = require('../services');
const logger = require('../config/logger');

const create =  catchAsync(async (req, res) => {
    userid = req.body.userid
    profil = req.body.profil
    const client = await clientService.createClientProfil(req.body);
    res.status(httpStatus.CREATED).send(client);
})


module.exports = {
    create
};
