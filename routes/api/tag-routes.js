const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// http://localhost:3001/api/tags

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  res.send("<h1>Find all tags</h1>")
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
