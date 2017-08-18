const express = require('express');
const router = express.Router();
const Drafts = require('../models/drafts');

/* GET users listing. */
router.get('/', (req, res) => {
  Drafts.find((err, row) => {
    if (err) {
      res.json({error: `Error: something went wrong '${err}' `});
    }
    res.json(row);
  });
});

router.get('/:id', (req, res) => {
  Drafts.find({_id: req.params.id}, (err, row) => {
    if (err) {
      res.send(err);
    }
    res.send(row);
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  const drafts = new Drafts();
  drafts.title = req.body.title;
  drafts.content = req.body.content;
  drafts.cover = req.body.cover;
  drafts.date = req.body.date;
  drafts.save(err => {
  	if (err) {
  		res.json({error: `Error: something went wrong '${err}' `});
  	}
  	res.json({message: `The post has added correctly.`});
  });
});

router.put('/', (req, res) => {
  Drafts.findById(req.body.id, (err, item) => {
    item.title = req.body.title;
    item.content = req.body.content;
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
  Drafts.remove({ _id: req.params.id}, err => {
    if (err) {
  	  res.json({error: `Error: something went wrong '${err}' `});
    }
    res.json({message: `id ${req.params.id} has been deleted`});
  });
});

module.exports = router;
