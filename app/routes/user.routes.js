module.exports = app => {
    const users = require("../controllers/user.controllers.js")
    var router =  require("express").Router();

    router.post("/users/new", users.create)

    router.get("/", (req, res) => {
        res.send('src/container/home.vue')
    });

    router.get("/home", (req, res) => {
        res.vue()
    })

    router
        .use((req, res) => {
                res.status(404);
                res.json({
                    error: "Page not found"
                });
            });

    app.use("/", router)
}

