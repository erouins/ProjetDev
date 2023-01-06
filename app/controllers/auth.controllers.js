const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();
const User = require('../models/user.models');
const bcrypt = require('bcrypt');

/**********************************/
/*** Routage de la ressource Auth */

exports.login = async (req, res) => {
    
    const { email, password } = req.body
    
    console.log(req.body)
    // Validation des données reçues
    if(!email || !password){
        return res.status(400).json({ message: 'no email or password'})
    }

    try{
        // Vérification si l'utilisateur existe
        let user = await User.findOne({ where: { email: email } });
        console.log(req.body);
        if(user === null){
            return res.status(401).json({ message: 'This account does not exists !'})
        }
        // Vérification du mot de passe
        console.log(req.body);
        let test = await bcrypt.compare(password, user.password)  
        if(!test){
            return res.status(401).json({ message: 'Mauvais mot de passe !'})
        }
        // Génération du token et envoi
        console.log(req.body);
        const token = jwt.sign({
            email: user.email,
            password: user.password
        }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_DURING  })
        
        return res.json({access_token: token, user_id: user.id});
    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Login process failed', error: err})        
    }
}
