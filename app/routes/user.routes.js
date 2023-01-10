/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const authController = require("../controllers/auth.controller");

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router();

/**********************************/
/*** Routage de la ressource User */

router.post("/new", authController.register);

router.get("/find", authController.findById);

router
    .use((req, res) => {
            res.status(404);
            res.json({
                error: "Page not found"
            });
        });

module.exports = router;


