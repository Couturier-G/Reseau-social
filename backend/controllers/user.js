const dotenv = require('dotenv').config();
const conDb = require('../mysqlDbConnect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

exports.signup = (req, res, next) => {
    const pool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    pool.getConnection(function (err, connection){
        if (err){
            console.log(err)
            return res.status(400).json("Erreur interne")
        }
        const user = req.body
        bcrypt.hash(user.password, 10) 
        .then((hash) => {
            user.password = hash;
            connection.query('SELECT * from users WHERE email=?', user.email, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json("Erreur interne")
                }
                if(result.length >= 1) {
                    return res.status(500).json({ message: "Adresse mail déjà existante."});
                } else {
                    connection.query(`INSERT INTO users SET ?`, user, (err, result) => {
                        if (err) {
                            console.log(err)
                            return res.status(400).json("Erreur interne")
                        }
                    return res.status(201).json({message : 'Votre compte a bien été crée !'})
                    });
                    connection.release();
                }
            })
        }); 
    }); 
}

exports.login = (req, res, next) => {
    const user = req.body
    if (user.email && user.password){
        conDb.query('SELECT * FROM users WHERE email = ?', user.email, function(err, results){
            if (err){
                console.log(err)
                return res.status(400).json("Erreur interne")
            }
            if (results.length <= 0){
                return res.status(500).json({ message: "Email inconnu"})
            } else {
                bcrypt.compare(user.password, results[0].password)
                .then(valid => {
                    if(!valid){
                        return res.status(500).json({ message: "Email ou mot de passe incorrect"});
                    } else {
                        return res.status(200).json({
                            id: results[0].id,
                            name: results[0].name,
                            firstname: results[0].firstname,
                            role: results[0].role,
                            token: jwt.sign(
                            { id: results[0].id},
                            process.env.TOKEN,
                            { expiresIn : '24h'}
                            ) 
                        })
                    }
                })
                .catch(() => {
                    return res.status(500).json({ message : 'Erreur interne' })
                })
            }
        })
    }
}

exports.getOneUser = (req, res, next) => {
    const userId = req.params.id
    conDb.query('SELECT * FROM users WHERE id="'+userId+'"', function(err,result){
      if (err){
          console.log(err);
          return res.status(400).json({ message : "Erreur interne" })
      }
      return res.status(201).json({ result })
  })
};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.id
    conDb.query('DELETE FROM users WHERE id=?', userId, function(err,result){
        if (err){
            console.log(err);
            return res.status(400).json({ message : "Erreur interne" })
        }
        return res.status(201).json({ message : "Utilisateur supprimé."})
    })
};