const express = require('express');
const Author = require('../models/author');
const router = express.Router();

// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if(req.query.name){
    searchOptions.name = new RegExp(req.query.name,'i')
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', { authors:authors,searchOptions:req.query });
  } catch {
    res.redirect('/');
  }
  res.render('authors/index');
});

// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

// Create Author Route
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect('authors');
  } catch {
    res.render('authors/new', { author, errorMessage: 'Error creating Author' });
  }

  // /* Save author to database, and if an error happened rerender the page with author name populated and ready in the field. Otherwise, render the page for the new author */
  // author.save((err, newAuthor) => {
  //   if (err) {
  //     res.render('authors/new', { author, errorMessage: 'Error creating Author' });
  //   } else {
  //     // res.redirect(`authors/${newAuthor.id}`)
  //     res.redirect('authors');
  //   }
  // });
});

module.exports = router;
