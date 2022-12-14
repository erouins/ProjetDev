const db = require("../models");
const jwt = require('jsonwebtoken');
const User  = db.users;

exports.createToken = (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let userData = new User({
        
    })

    const token = jwt.sign(userData.toJSON(), jwtSecretKey);

    res.send(token);
}

exports.validateToken = (req, res) => {
    // Tokens are generally passed in the header of the request
    // Due to security reasons.

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
}

exports.create = (req, res) => {

    if (!req.body.firstName) {
        res.status(400).send({ message: "firstname missing" });
        return;
      }
    else if (!req.body.lastName) {
        res.status(400).send({ message: "lastname missing" });
        return;
      }
    else if (!req.body.age) {
        res.status(400).send({ message: "age missing" });
        return;
    }
    
    const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        age : req.body.age
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