const Joi = require('joi');

const UpdateArticleDto = Joi.object({
  title: Joi.string().optional(),
  authorId: Joi.number().positive().optional(),
});

module.exports = UpdateArticleDto;
