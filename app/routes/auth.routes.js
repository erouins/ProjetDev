/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const auth = require('../middlewares/auth');
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
router.post('/reset-password', validate(authValidation.resetPassword), authCtrl.resetPassword);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authCtrl.refreshTokens);
router.post( '/send-verification-email',authCtrl.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authCtrl.verifyEmail);
router.post('/logout', validate(authValidation.logout), authCtrl.logout);

/*********************************
/*** Routage de la ressource Auth */

router.put('/login', authCtrl.login);

module.exports = router;