const db = require("../models");
const User  = db.users;


exports.create = (req, res) => {

    if (!req.body.firstName) {
        res.status(400).send({ message: "firstname missing" });
        return;
      }
    else if (!req.body.lastName) {
        res.status(400).send({ message: "lastname missing" });
        return;
      }
    else if (!req.body.email) {
        res.status(400).send({ message: "email missing" });
        return;
    }
    
    const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        age : req.body.email
    })

    user.save(user).then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            mesage: 
                err.message || "Some error occured while creating new user"
        })
    })
}

exports.findById = (req, res) => {
    const id = req.params.id

    User.findById(id)
    .then(data => {
        if(!data) res.status(404).send({message: "Not found user with id :" + id})
        else res.send(data)
    })
    .catch(err => {
        res.status(500)
        .send({message: "Error retrieving user with id : " + id})
    })
}