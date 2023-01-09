const Usermodel = require("../models/user.model");
const bcrypt = require('bcrypt');


exports.create = async (req, res) => {
    if (!req.body.password) {
        res.status(400).send({ message: "password missing" });
        return;
      }
    else if (!req.body.email) {
        res.status(400).send({ message: "email missing" });
        return;
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    

    const user = new Usermodel({
        password : hash ,
        email : req.body.email,
        firstName : req.body.firstname,
        lastName : req.body.lastname,
        accountType : req.body.accountType
    });

    

    user.save(user).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            mesage: 
                err.message || "Some error occured while creating new user"
        });
    });
}

exports.findById = (req, res) => {
    const id = req.params.id

    Usermodel.findOne(id)
    .then(data => {
        if(!data) res.status(404).send({message: "Not found user with id :" + id});
        else res.send(data);
    })
    .catch(err => {
        res.status(500)
        .send({message: "Error retrieving user with id : " + id})
    })
}