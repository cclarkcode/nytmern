const axios = require("axios");
const router = require("express").Router();
const db = require('../modules/db-setup');
const mongoose = require('mongoose');

router.post('/newarticle/:list', (req, res) => {
  console.log('Trying to save');

  db.List.findOne({
      name: req.params.list
    })
    .populate('articles')
    .exec((error, document) => {

      console.log(document);


      let found = false;
      document.articles.forEach((item) => {
        if (item.link === req.body.link) {
          found = true;
        }
      });



      if (found) {
        console.log('Article already in list');
      } else {
        const newArticle = new db.Article(req.body);
        document.articles.push(newArticle);
        document.save(() => {
          console.log('Article saved in list');
        })
      }


    });

});

router.get('/articles/:list', (req, res) => {

  db.List.findOne({
      name: req.params.list
    })
    .populate('articles')
    .exec(function (error, data) {

      if (error) {
        console.log(error)
      } else {
        res.json(data);
      }
    });

});

router.get('/alllists', (req, res) => {

  db.List.find(function (error, data) {

    if (error) {
      console.log(error)
    } else {
      res.json(data);
    }

  });

});

router.get('/activelist', (req, res) => {

  db.List.findOne({
    active: true
  }, function (error, data) {

    if (error) {
      console.log(error)
    } else {
      res.json(data);
    }

  });

});

router.post('/activelist/:list', (req, res) => {
  db.List.findOne({
    active: true
  }, function (error, data) {
    if (error) {
      console.log(error)
    } else {
      //Update current active list to false  
      db.List.update({
        '_id': data['_id']
      }, {
        active: false
      }, function (error, data) {
        db.List.update({
          name: req.params.list
        }, {
          active: true
        }, function (error, data) {

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



router.delete('/:list/:id', (req, res) => {
  console.log('Deleting');

  db.List.update({
      name: req.params.list
    }, {
      $pull: {
        'articles': {
          '_id': req.params.id
        }
      }
    },
    (error, data) => {
      if (error) {
        console.log(error);
        console.log(data);
      } else {


        res.json(data);
      }
    });

});

router.post('/newlist/:list', (req, res) => {
console.log('getting here too');

db.List.findOne({
  name: req.params.list
}, (error, response) => {

  if (response) {
    console.log('list already exists');
    res.send('List already exists');
  } else {

    db.List.findOne({
        active: true
      })
      .populate('articles')
      .exec(function (error, document) {
        if (!error) {

          if (document) {
            document.active = false;
            document.save();



            db.List.create({
              name: req.params.list,
              active: true
            }, function (error, response) {
              console.log(document);
              document.articles.map((item) => {
                response.articles.push(new db.Article({
                  title: item.title,
                  date: item.date,
                  link: item.link,
                  byline: item.byline
                }));
              });

                response.save(() => {
                  console.log(response);
                  res.json(response);
                });
            });
            
          }
        }
      });
    }
  });
});





module.exports = router;