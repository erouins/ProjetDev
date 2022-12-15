module.exports = app => {
    const users = require("../controllers/user.controllers.js")
    var router =  require("express").Router();

    router.put("/generateToken", users.createToken)

    router.get("/validateToken", users.validateToken)

    router.put("/new", users.create)

    router.get("/:id", users.findById)

    router
        .use((req, res) => {
                res.status(404);
                res.json({
                    error: "Page not found"
                });
            });

    app.use("/users/", router)
}

