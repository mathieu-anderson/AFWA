const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  MongoClient.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPW}@ds031741.mlab.com:31741/af`, function (err, db) {
    if (err) throw err
    console.log("Yay connected")
    db.collection('archives').find().toArray( (err, docs) => {
      if (err) {alert("An error occured")}
      res.json(docs)
    })
  })
});

module.exports = router;
