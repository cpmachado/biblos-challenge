const ARTICLES = require('../data/articles.json');
const logger = require('../util/logger');
const Article = require('./entities/article.entity');

/**
 * Service for Authors
 *
 * @property {Article[]} articles Array of articles
 */
class ArticlesService {
  constructor() {
    this.articles = ARTICLES.map(
      (article) => new Article(article.id, article.title, article.author_id),
    );
    this.maxId = this.articles.reduce(
      (acc, curr) => Math.max(acc.id, curr.id),
      0,
    );
    logger.info('[!] ArticlesService initialized');
  }

  /**
   * Retrieve a list of articles
   *
   * @returns {Article[]} a list of articles
   */
  findAll() {
    return this.articles;
  }

  /**
   * Retrieve all articles with a given authorId
   *
   * @param {number} authorId Asoociated author id
   * @returns {Article[]} articles with given author id
   */
  findAllByAuthorId(authorId) {
    return this.articles.filter((article) => article.authorId === authorId);
  }

  /**
   * Retrieve a specific article by its id
   *
   * @param {number} id Asoociated id of a given Article
   * @returns {Article | null} the article
   */
  findById(id) {
    return this.articles.find((article) => article.id === id);
  }
}
module.exports = new ArticlesService();
