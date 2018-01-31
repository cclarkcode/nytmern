const axios = require("axios");
const router = require("express").Router();
const db = require('../modules/db-setup');

router.post('/newarticle', (req,res) => {
  console.log('Trying to save');

  db.Article.findOne({
    link: req.body.link
  }).then((response) => {
    if (response) {
      console.log('Already saved');
    }
    else {
      db.Article.create(req.body, function (error, response) {

        if (error) {
            console.log(error)
        } else {
            console.log('Completed request');
            res.send(response);
        }

    });
    }

  });

});

router.get('/articles', (req,res) => {

  db.Article.find(function (error,data) {

    if (error) {
        console.log(error)
    } else {
        res.json(data);
    }

});

router.get('/alllists', (req,res) => {

    db.List.find(function (error,data) {

      if (error) {
          console.log(error)
      } else {
          res.json(data);
      }

  });

});

router.get('/activelist', (req,res) => {

  db.List.findOne({
    active: true
  }, function (error,data) {

    if (error) {
        console.log(error)
    } else {
        res.json(data);
    }

});

});

router.post('/activelist/:list', (req,res) => {
  db.List.findOne({
    active: true
  }, function (error,data) {
    if (error) {
      console.log(error)
    } else {
      //Update current active list to false  
      db.List.update({
          '_id': data['_id']
        },{
          active: false
        }, function (error,data) {
          db.List.update({
            name: req.params.list
          },{
            active: true
          }, function(error, data) {

            if (error) {
              res.send(error)
            } else {
              res.send(data);
            }
          });
        });
    }
  });

});



router.delete('/:id', (req,res) => {
  console.log('Deleting');
  db.Article.remove({
    _id: req.params.id
  }).then( (response) => {
    res.send(response);
  });

});



});

module.exports = router;
