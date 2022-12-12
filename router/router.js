const express = require("express");
const router = express.Router();

router
   .get("/", (req, res) => {
       res.send('src/container/home.vue')
       res.module()
   });

   router.get("/home", (req, res) => {
    res.vue()
   })

router
    .use((req, res) => {
            res.status(404);
            res.json({
                error: "Page not foezfzsdrezgreund"
            });
        });

module.exports = router;