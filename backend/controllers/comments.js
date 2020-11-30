const conDb = require('../mysqlDbConnect');
const jwt = require('jsonwebtoken');

exports.getAllComments = (req, res, next) => {
    conDb.query('SELECT * FROM comments ORDER BY date DESC', (err, result) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ message : "Erreur interne"})
        }
        return res.status(200).json({result});
        
    })
};

exports.comment = (req, res, next) => {
    const comment = {
        authorname: req.body.authorname,
        authorfirstname: req.body.authorfirstname,
        authorid: req.body.authorid,
        publicationid: req.body.publicationid,
        commentary: req.body.commentary
    }
    conDb.query('INSERT INTO comments SET ?', comment, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message : "Erreur interne"})
        }
    return res.status(201).json({ message: 'Votre commentaire a bien été posté !' })
    })
};

exports.getOneComment = (req, res, next) => {
    const commentId = req.params.id
    conDb.query('SELECT * FROM comments WHERE publicationid="'+commentId+'"', function(err,result){
      if (err){
          console.log(err);
          return res.status(400).json({ message : "Erreur interne" })
      }
      return res.status(201).json({ result })
  })
};

exports.deleteComment = (req, res, next) => {
    const commentId = req.params.id
    conDb.query('DELETE FROM comments WHERE id=?', commentId, function(err,result){
        if (err){
            console.log(err);
            return res.status(400).json({ message : "Erreur interne" })
        }
        return res.status(201).json({ message : "Publication supprimée."})
    })
};