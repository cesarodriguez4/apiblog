const express = require('express');
const router = express.Router();
const News = require('../models/news');

/* GET users listing. */
router.get('/', (req, res) => {
  News.find((err, row) => {
    if (err) {
      res.json({error: `Error: something went wrong '${err}' `});
    }
    res.json(row);
  });
});

router.get('/:id', (req, res) => {
  News.find({_id: req.params.id}, (err, row) => {
    if (err) {
      res.send(err);
    }
    res.send(row);
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  const news = new News();
  news.title = req.body.title;
  news.content = req.body.content;
  news.language = req.body.language;
  news.category = req.body.category;
  news.cover = req.body.cover;
  news.date = req.body.date;
  news.save(err => {
  	if (err) {
  		res.json({error: `Error: something went wrong '${err}' `});
  	}
  	res.json({message: `The post has added correctly.`});
  });
});

router.put('/', (req, res) => {
  News.findById(req.body.id, (err, item) => {
    item.title = req.body.title;
    item.content = req.body.content;
    item.category = req.body.category;
    item.cover = req.body.cover;
    item.save((err) => {
      if (err) {
  	    res.json({error: `Error: something went wrong '${err}' `});
      }
      res.json({message: 'Success'});
    });
  });
});

router.delete('/:id', (req, res) => {
  News.remove({ _id: req.params.id}, err => {
    if (err) {
  	  res.json({error: `Error: something went wrong '${err}' `});
    }
    res.json({message: `id ${req.params.id} has been deleted`});
  });
});

module.exports = router;
