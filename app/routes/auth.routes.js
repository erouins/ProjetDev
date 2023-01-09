/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const validate = require('../middlewares/validate');
const authCtrl = require('../controllers/auth.controller')
const authValidation = require('../validations/auth.validation');

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/*********************************************/
/*** Middleware pour logger dates de requete */
router.use( (req, res, next) => {
    const event = new Date()
    console.log('AUTH Time:', event.toString())
    next()
});

router.post('/forgot-password', validate(authValidation.forgotPassword), authCtrl.forgotPassword);

/**********************************/
/*** Routage de la ressource Auth */

router.put('/login', authCtrl.login);

module.exports = router;