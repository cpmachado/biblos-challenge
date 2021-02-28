const Joi = require('joi');

const CreateArticleDto = Joi.object({
  title: Joi.string().required(),
  authorId: Joi.number().required(),
});

module.exports = CreateArticleDto;
