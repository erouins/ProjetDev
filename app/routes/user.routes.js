module.exports = app => {
    const users = require("../controllers/user.controllers.js")
    var router =  require("express").Router();

    router.post("/generateToken", users.createToken)

    router.get("/validateToken", users.validateToken)

    router.post("/new", users.create)

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

