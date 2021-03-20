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
   * @param {string} title article's title
   * @param {string} authorId author's id
   * @returns {Article} Article instance
   */
  constructor(id, title, authorId) {
    this.id = id;
    this.title = title;
    this.authorId = authorId;
  }

  withoutAuthor() {
    const { id, title } = this;
    return {
      id,
      title,
    };
  }
}

module.exports = Article;
