const dotenv = require('dotenv').config();
const conDb = require('../mysqlDbConnect');
const mysql = require('mysql');
const fs = require('fs');

exports.getAllPublications = (req, res, next) => {
    conDb.query('SELECT * FROM publications ORDER BY date DESC', (err, result) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ message : "Erreur interne"})
        }
        return res.status(200).json({result});
    })
};

exports.publish = (req, res, next) => {
    const attachmentUrl = req.file.filename;
    const publications = {
        authorname: req.body.authorname,
        authorfirstname: req.body.authorfirstname,
        authorid: req.body.authorid,
        title: req.body.title,
        attachment: attachmentUrl
    }
    conDb.query('INSERT INTO publications SET ?', publications, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message : "Erreur interne"})
        }
    return res.status(201).json({ message: 'Votre message a bien été posté !' })
    })
};

exports.getOnePublications = (req, res, next) => {
    const publicationsId = req.params.id
    conDb.query('SELECT * FROM publications WHERE id="'+publicationsId+'"', function(err,result){
      if (err){
          console.log(err);
          return res.status(400).json({ message : "Erreur interne" })
      }
      return res.status(201).json({ result })
  })
};


exports.deletePublication = (req, res, next) => {
    // const pool = mysql.createPool({
    //     connectionLimit: 10,
    //     host: process.env.DB_HOST,
    //     user: process.env.DB_USER,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_NAME
    // });
    // pool.getConnection(function (err, connection){
    //     if (err){
    //         console.log(err)
    //         return res.status(400).json("Erreur interne")
    //     }
    //     const publicationId = req.params.id
    //     connection.query('SELECT * FROM publications WHERE id=?', publicationId,(err, result) => {
    //         if (err) {
    //             console.log(err)
    //             return res.status(400).json("Erreur interne")
    //         } else {
    //             const exportResult = result;
    //             const filename = exportResult[0].attachment
    //             console.log(filename);
    //             fs.unlink(`/images/${filename}`, err => {
                    
    //             });
    //             console.log("test6584684")
    //             connection.query('DELETE FROM publications WHERE id=?', publicationId, function(err,result){
    //                 if (err){
    //                     console.log(err);
    //                     return res.status(400).json({ message : "Erreur interne" })
    //                 } else {
    //                     connection.query('DELETE FROM comments WHERE publicationid=?', publicationId, function(err,result){
    //                         if (err){
    //                             console.log(err);
    //                             return res.status(400).json({ message : "Erreur interne" })
    //                         }
    //                         return res.status(201).json({message : 'Publication supprimé avec ses commentaires'})
    //                     });
    //                     connection.release();
    //                 }
    //             })
    //         }     
    //     })     
    // })
    const publicationId = req.params.id
    conDb.query('SELECT * FROM publications WHERE id=?', publicationId,(err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).json("Erreur interne")
        } else {
            const exportResult = result;
            const filename = exportResult[0].attachment
            fs.unlink(`images/${filename}`, () => {
                conDb.query('DELETE FROM publications WHERE id=?', publicationId, function(err,result){
                    if (err){
                        console.log(err);
                        return res.status(400).json({ message : "Erreur interne" })
                    } else {
                        conDb.query('DELETE FROM comments WHERE publicationid=?', publicationId, function(err,result){
                            if (err){
                                console.log(err);
                                return res.status(400).json({ message : "Erreur interne" })
                            }
                            return res.status(201).json({message : 'Publication supprimé avec ses commentaires'})
                        });
                    }
                })
            });
        }
    })
}