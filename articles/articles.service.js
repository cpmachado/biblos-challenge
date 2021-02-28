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
      (acc, curr) => Math.max(acc, curr.id),
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

  /**
   * Add an article
   *
   * @param {CreateArticleDto} createArticleDto dto for the creation of an author
   * @returns {Article | null} the author added
   */
  addArticle(createArticleDto) {
    const { title, authorId } = createArticleDto;
    let { id } = createArticleDto;

    if (!id) {
      this.maxId += 1;
      id = this.maxId;
    } else if (this.findById(id)) {
      return null;
    } else {
      this.maxId = Math.max(this.maxId, id);
    }
    const article = new Article(id, title, authorId);
    this.articles.push(article);
    return article;
  }

  /**
   * Updates a given article
   *
   * @param {number} id the id of article being updated
   * @param {UpdateArticleDto} updateArticleDto update dto to be used
   * @returns {Article | null} The updated article
   */
  updateArticle(id, updateArticleDto) {
    const articleIdx = this.articles.findIndex((article) => article.id === id);
    if (articleIdx < 0) {
      return null;
    }
    Object.assign(this.articles[articleIdx], updateArticleDto);
    return this.articles[articleIdx];
  }

  /**
   * Remove a given article with id
   *
   * @param {number} id Associeted id of a given Article
   * @returns {Article | null} the article
   */
  removeById(id) {
    const articleIdx = this.articles.findIndex((article) => article.id === id);

    if (articleIdx < 0) {
      return null;
    }
    return this.articles.splice(articleIdx, 1)[0];
  }
}
module.exports = new ArticlesService();
