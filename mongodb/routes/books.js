const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Models
const Book = require('../models/Book');


router.post('/new', (req, res, next) => {
  const book = new Book({
    title: 'Ud',
    year:1600,
    published: true,
    comments: [
      {message: "Wonderful book!"}, 
      {message: "I don't like it!"}
    ],
    meta: {
      votes: 12,
      favs: 104
    }
  });
  
  book.save((err, data) => {
    if (err)
        res.json(err);

    res.json(data);
  });
});

router.get('/search', (req, res) => {
  Book.find({ 
    category: {
      $exists: false
    }
  },'title comments category', (err, data) => {
    res.json(data);
  })
});

router.get('/searchOne', (req, res) => {
  Book.findOne({ title: "Udemy"}, (err, data) => {
    res.json(data);
  });
});

router.get('/searchById', (req, res) => {
  Book.findById('5e88ce37d031185221e17a92', (err, data) => {
    res.json(data);
  });
});

router.put('/update', (req, res) => {
  Book.update(
    {
      published: false
    }, 
    { 
      published: true,
      title: 'Test title'
    },
    {
      //multi:true
      upsert: true
    }, 
    (err, data) => {
    res.json(data);
  });
});

router.put('/updateById', (req, res) => {
  Book.findByIdAndUpdate(
      '5e88ce33d031185221e17a8f',
      {
        title: 'Hello World!',
        'meta.favs': 99
      },
      (err, data) => {
      res.json(data);
    });
});

router.delete('/remove', (req, res) => {
  Book.remove({ published: true}, (err, data) => {
        res.json(data);
  });
});

router.get('/sort', (req, res) => {
  Book.find({ }, (err, data) => {
        res.json(data);
  }).sort({ 'meta.favs': -1, 'title': 1});
});

router.get('/limitAndSkip', (req, res) => {
  Book.find({ }, (err, data) => {
        res.json(data);
  })
  .skip(1)
  .limit(2);
});

router.get('/aggregate', (req, res) => {
    Book.aggregate([
      {
        $match: {
          published: true
        }
      },
      /*{
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }*/
      {
        $project: {
          title: 1,
          meta: 1
        }
      },
      {
        $sort: { title: -1 }
      },
      {
        $limit: 5
      },
      {
        $skip: 1
      }
    ], (err, result) => {
      res.json(result);
    });

});

router.get('/aggregate-lookup', (req, res) => {
    Book.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId('5e88d41e6230c056b7705d2d')
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
            $unwind: '$user'
        },
        {
          $project: {
            title: 1,
            user: '$user'
          }
        }
    ], (err, result) => {
      res.json(result);
    });

});


module.exports = router;