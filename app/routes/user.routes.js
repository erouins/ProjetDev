/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router();

/**********************************/
/*** Routage de la ressource User */

router.post("/new", authController.register);

router.post("/find", authController.findById);

router.get("/:userId", userController.findById);

router.delete("/:userId", userController.deleteUser);

router
    .use((req, res) => {
            res.status(404);
            res.json({
                error: "Page not found"
            });
        });

module.exports = router;


