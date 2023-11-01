const express = require('express');
const router = express.Router();
const authorModel = require('../models/Author'); 

router.post('/authors', async (req, res) => {
  try {
    const authorData = req.body;
    const createdAuthor = await authorModel.createAuthor(authorData);
    res.json(createdAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/authors', async (req, res) => {
  try {
    const authors = await authorModel.getAllAuthors();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/authors/:isbn', async (req, res) => {
  try {
    const ISBN = req.params.isbn;
    const updatedData = req.body;
    const updatedAuthor = await authorModel.updateAuthor(ISBN, updatedData);
    res.json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/authors/:isbn', async (req, res) => {
  try {
    const ISBN = req.params.isbn;
    const deletedAuthor = await authorModel.deleteAuthor(ISBN);
    res.json(deletedAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
