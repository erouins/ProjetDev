const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();
const DB = require('../../db.config')
const User = DB.users

/**********************************/
/*** Routage de la ressource Auth */

exports.login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    
    
    // Validation des données reçues
    if(!email || !password){
        return res.status(400).json({ message: 'Bad email or password'})
    }

    try{
        // Vérification si l'utilisateur existe
        let user = await User.findOne({ email: email, raw: true});
        if(user === null){
            return res.status(401).json({ message: 'This account does not exists !'})
        }
        // Vérification du mot de passe
        //let test = await bcrypt.compare(password, user.password)  
        if(user.password != password){
            return res.status(401).json({ message: 'Mauvais mot de passe !'})
        }
        // Génération du token et envoi
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
