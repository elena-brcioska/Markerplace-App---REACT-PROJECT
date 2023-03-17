const {v4: generateId} = require('uuid');

const {NotFoundError} = require('../util/errors');
const {readData, writeData} = require('./util');

async function getAll() {
  const storedData = await readData();
  if (!storedData.products) {
    throw new NotFoundError('Could not find any products.');
  }
  return storedData.products;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.products || storedData.products.length === 0) {
    throw new NotFoundError('Could not find any products.');
  }

  const product = storedData.products.find((product) => product.id === id);
  if (!product) {
    throw new NotFoundError('Could not find product for id ' + id);
  }

  return product;
}

async function getComments(id) {
  const storedData = await readData();
  if (!storedData.products || storedData.products.length === 0) {
    throw new NotFoundError('Could not find any products.');
  }

  const product = storedData.products.find((product) => product.id === id);
  if (!product) {
    throw new NotFoundError('Could not find product for id ' + id);
  }

  return product.comments;
}

async function add(data) {
  const storedData = await readData();
  storedData.products.unshift({...data, id: generateId()});
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.products || storedData.products.length === 0) {
    throw new NotFoundError('Could not find any products.');
  }

  const index = storedData.products.findIndex((product) => product.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find product for id ' + id);
  }

  storedData.products[index] = {...data, id};

  await writeData(storedData);
}

async function addComment(id, data) {
  const storedData = await readData();
  if (!storedData.products || storedData.products.length === 0) {
    throw new NotFoundError('Could not find any products.');
  }

  const index = storedData.products.findIndex((product) => product.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find product for id ' + id);
  }

  storedData.products[index].comments.push(data);

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.products.filter((product) => product.id !== id);
  await writeData({...storedData, products: updatedData});
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
exports.addComment = addComment;
exports.getComments = getComments;
