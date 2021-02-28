const { StatusCodes } = require('http-status-codes');
const express = require('express');
const Joi = require('joi');
const CreateAuthorDto = require('./dto/create-author.dto');
const authorsService = require('./authors.service');
const articlesService = require('../articles/articles.service');
const UpdateAuthorDto = require('./dto/update-author.dto');
const PaginationService = require('../common/paginationservice');

const router = express.Router();
const paginationService = new PaginationService([
  { name: 'id', type: 'number' },
  { name: 'name', type: 'string' },
]);

router.get('/', (req, res, next) => {
  const { query } = req;
  const { errors, value } = paginationService.validate(query);

  if (errors) {
    const err = new Error(errors);
    err.status = StatusCodes.BAD_REQUEST;
    next(err);
    return;
  }
  req.paginate = value;
  next();
}, (req, res) => {
  const { paginate } = req;
  let authors = authorsService
    .findAll()
    .map((author) => author.getWithCountry())
    .map((author) => {
      const { id } = author;
      const articles = articlesService.findAllByAuthorId(id);
      return {
        ...author,
        articles,
      };
    });
  authors = paginationService.paginate(authors, paginate);
  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    authors,
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const { error } = Joi.number().positive().validate(+id);

  if (error) {
    const err = new Error(error);
    err.message.replace('value', 'id');
    err.status = StatusCodes.BAD_REQUEST;
    next(err);
    return;
  }
  let author = authorsService.findById(+id);

  if (!author) {
    const err = new Error('Author not found');
    err.status = StatusCodes.NOT_FOUND;
    next(err);
    return;
  }

  author = author.getWithCountry();

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    author,
  });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  const createAuthorDto = CreateAuthorDto.validate(body);

  if (createAuthorDto.error) {
    const err = new Error(createAuthorDto.error);
    err.status = StatusCodes.BAD_REQUEST;
    next(err);
    return;
  }

  const author = authorsService
    .addAuthor(createAuthorDto.value)
    .getWithCountry();

  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED,
    author,
  });
});

router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { error } = Joi.number().positive().validate(+id);

  if (error) {
    const err = new Error(error);
    err.status = StatusCodes.BAD_REQUEST;
    next(err);
    return;
  }

  const { body } = req;
  const updateAuthor = UpdateAuthorDto.validate(body);

  if (updateAuthor.error) {
    const err = new Error(updateAuthor.error);
    err.status = StatusCodes.BAD_REQUEST;
    next(err);
    return;
  }

  let author = authorsService.updateAuthor(+id, updateAuthor.value);

  if (!author) {
    const err = new Error(`Author ${id} not found`);
    err.status = StatusCodes.NOT_FOUND;
    next(err);
    return;
  }

  author = author.getWithCountry();

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    author,
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const { error } = Joi.number().positive().validate(+id);

  if (error) {
    const err = new Error(error);
    err.status = StatusCodes.BAD_REQUEST;
    next(err);
    return;
  }

  let author = authorsService.removeById(+id);

  if (!author) {
    const err = new Error(`Author ${id} not found`);
    err.status = StatusCodes.NOT_FOUND;
    next(err);
    return;
  }

  author = author.getWithCountry();

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    author,
  });
});

module.exports = router;
