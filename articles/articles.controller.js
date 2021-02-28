const { StatusCodes } = require('http-status-codes');
const express = require('express');
const Joi = require('joi');
const CreateArticleDto = require('./dto/create-article.dto');
const articlesService = require('./articles.service');
const authorsService = require('../authors/authors.service');
const UpdateArticleDto = require('./dto/update-article.dto');
const PaginationService = require('../common/paginationservice');

const router = express.Router();
const paginationService = new PaginationService([
  { name: 'id', type: 'number' },
  { name: 'title', type: 'string' },
]);

router.get('/', (req, _res, next) => {
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
  let articles = articlesService.findAll();
  articles = paginationService.paginate(articles, paginate);
  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    articles,
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
  const article = articlesService.findById(+id);

  if (!article) {
    const err = new Error('Article not found');
    err.status = StatusCodes.NOT_FOUND;
    next(err);
    return;
  }

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    article,
  });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  const { error, value} = CreateArticleDto.validate(body);

  if (error) {
    const err = new Error(error);
    err.status = StatusCodes.BAD_REQUEST;
    next(err);
    return;
  }

  if (!authorsService.findById(value.authorId)) {
    authorsService.addEmptyAuthor(value.authorId);
  }
  const article = articlesService.addArticle(value);

  res.status(StatusCodes.ACCEPTED).json({
    status: StatusCodes.ACCEPTED,
    article,
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
  const updateArticle = UpdateArticleDto.validate(body);

  if (updateArticle.error) {
    const err = new Error(updateArticle.error);
    err.status = StatusCodes.BAD_REQUEST;
    next(err);
    return;
  }

  const article = articlesService.updateArticle(+id, updateArticle.value);

  if (!article) {
    const err = new Error(`Author ${id} not found`);
    err.status = StatusCodes.NOT_FOUND;
    next(err);
    return;
  }

  const author = authorsService.findById(article.authorId);
  if (!author) {
    authorsService.addEmptyAuthor(article.authorId);
  }

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    article,
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

  const article = articlesService.removeById(+id);

  if (!article) {
    const err = new Error(`Author ${id} not found`);
    err.status = StatusCodes.NOT_FOUND;
    next(err);
    return;
  }

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    article,
  });
});

module.exports = router;
