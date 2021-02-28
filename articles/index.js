const ArticlesService = require('./articles.service');
const Article = require('./entities/article.entity');
const CreateArticleDto = require('./dto/create-article.dto');
const UpdateArticleDto = require('./dto/update-article.dto');
const articlesController = require('./articles.controller');

module.exports = {
  Article,
  ArticlesService,
  CreateArticleDto,
  UpdateArticleDto,
  articlesController,
};
