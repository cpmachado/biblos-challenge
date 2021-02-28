/**
 * Class to define Article type
 * @property {number} id a given id
 * @property {string} title article's title
 * @property {number} authorId id of author
 */
class Article {
  /**
   * Constructor of the Article Type
   *
   * @param {number} id article's id
   * @param {string} name article's title
   * @param {string} authorId author's id
   * @returns {Article} Article instance
   */
  constructor(id, name, authorId) {
    this.id = id;
    this.name = name;
    this.authorId = authorId;
  }
}

module.exports = Article;
