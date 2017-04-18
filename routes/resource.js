const express = require('express');
const router = express.Router();
const mongodb = require('mongodb')
MongoClient = require('mongodb').MongoClient

router.get('/:id', function(req, res, next) {
  const test = req.params.id.length
  if (test < 10) {
    const item = req.params.id
    const record = []
    let displayStory = false
    let displayElement = false
    MongoClient.connect('mongodb://matand:alliance@ds031741.mlab.com:31741/af', function (err, db) {
      if (err) throw err
      console.log("Yay connected")
      db.collection('archives').find({item: item},{}).toArray( (err, docs) => {
        if (err) {alert("An error occured")}
        record.push(docs[0])
        if (record[0].story) {
          displayStory = true
        }
        if (record[0].element) {
          displayElement = true
        }
        res.render('resource',
          {
          displayStory: displayStory,
          displayElement: displayElement,
          box: record[0].box,
          item: record[0].item,
          element: record[0].element,
          year: record[0].year,
          nature: record[0].nature,
          content: record[0].content,
          story: record[0].story,
          pages: record[0].volume,
          digitized: record[0].digitized
          }
        )
      })
    })
  } else {
    const element = req.params.id
    const record = []
    let displayStory = false
    let displayElement = false
    MongoClient.connect('mongodb://matand:alliance@ds031741.mlab.com:31741/af', function (err, db) {
      if (err) throw err
      console.log("Yay connected")
      db.collection('archives').find({element: element},{}).toArray( (err, docs) => {
        if (err) {alert("An error occured")}
        record.push(docs[0])
        if (record[0].story) {
          displayStory = true
        }
        if (record[0].element) {
          displayElement = true
        }
        res.render('resource',
          {
          displayStory: displayStory,
          displayElement: displayElement,
          box: record[0].box,
          item: record[0].item,
          element: record[0].element,
          year: record[0].year,
          nature: record[0].nature,
          content: record[0].content,
          story: record[0].story,
          pages: record[0].volume,
          digitized: record[0].digitized
          }
        )
      })
    })
  }
});

module.exports = router;
