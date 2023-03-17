const express = require('express');

const {getAll, get, add, replace, remove, addComment, getComments} = require('../data/product');
const {checkAuth} = require('../util/auth');
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require('../util/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log(req.token);
  try {
    const products = await getAll();
    res.json({products: products});
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await get(req.params.id);
    res.json({product: product});
  } catch (error) {
    next(error);
  }
});

router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await getComments(req.params.id);
    res.json({comments: comments});
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

router.post('/', async (req, res, next) => {
  console.log(req.token);
  const data = req.body;
  console.log(data);

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = 'Invalid image.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Adding the product failed due to validation errors.',
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({message: 'Product saved.', product: data});
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = 'Invalid image.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the product failed due to validation errors.',
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({message: 'Product updated.', product: data});
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({message: 'Product deleted.'});
  } catch (error) {
    next(error);
  }
});

router.post('/:id/comments', async (req, res, next) => {
  console.log(req.token);
  const data = req.body;

  try {
    await addComment(req.params.id, data);
    res.status(201).json({message: 'Comment saved.', comment: data});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
