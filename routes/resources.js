const express = require('express');
const router = express.Router();
const mongodb = require('mongodb')
MongoClient = require('mongodb').MongoClient

router.get('/', function(req, res, next) {
  MongoClient.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPW}@ds031741.mlab.com:31741/af`, function (err, db) {
    if (err) throw err
    db.collection('archives').find().toArray( (err, docs) => {
      if (err) {alert("An error occured")}
      res.json(docs)
    })
  })
});

router.get('/search?', function(req, res, next) {
  console.log(req.query)
})

router.get('/:id', function(req, res, next) {
  const test = req.params.id.length
  if (test < 10) {
    const item = req.params.id
    MongoClient.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPW}@ds031741.mlab.com:31741/af`, function (err, db) {
      if (err) throw err
      db.collection('archives').find({item: item},{}).toArray( (err, docs) => {
        if (err) {alert("An error occured")}
        res.json(docs)
      })
    })
  } else {
    const element = req.params.id
    MongoClient.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPW}@ds031741.mlab.com:31741/af`, function (err, db) {
      if (err) throw err
      db.collection('archives').find({element: element},{}).toArray( (err, docs) => {
        if (err) {alert("An error occured")}
        res.json(docs)
      })
    })
  }
})



module.exports = router;
