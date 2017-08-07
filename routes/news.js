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

router.post('/', (req, res) => {
  const news = new News();
  news.title = req.body.title;
  news.content = req.body.content;
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
