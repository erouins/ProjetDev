/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const userCtrl = require("../controllers/user.controllers.js");

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router();

/**********************************/
/*** Routage de la ressource User */

router.post("/new", userCtrl.create);
router.get("/:id", userCtrl.findById);

router
    .use((req, res) => {
            res.status(404);
            res.json({
                error: "Page not found"
            });
        });

module.exports = router;


