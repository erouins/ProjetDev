const db = require("../models");
const User  = db.users;

exports.create = (req, res) => {
    const user = new User({
        firstName : "Didier",
        lastName : "Deschamps",
        age : 10
    })

    User.save(user).then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            mesage: 
                err.message || "Some error occured while creating new user"
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    User.findById()
    .then(data => {
        if(!data) res.status(404).send({message: "Not found user with id :" + id})
        else res.send(data)
    })
    .catch(err => {
        res.status(500)
        .send({message: "Error retrieving user with id : " + id})
    })
}