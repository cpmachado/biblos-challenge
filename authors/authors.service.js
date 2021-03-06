const AUTHORS = require('../data/authors.json');
const logger = require('../util/logger');
const Author = require('./entities/author.entity');

/**
 * Service for Authors
 *
 * @property {Author[]} authors Array of authors
 */
class AuthorsService {
  constructor() {
    this.authors = AUTHORS.map(
      (author) => new Author(author.id, author.name, author.country_code),
    );
    this.maxId = this.authors.reduce((acc, curr) => Math.max(acc, curr.id), 0);
    logger.info('[!] AuthorsService initialized');
  }

  /**
   * Retrieve a list of authors
   *
   * @returns {Author[]} a list of authors
   */
  findAll() {
    return this.authors.slice();
  }

  /**
   * Retrieve a specific author by his id
   *
   * @param {number} id Associeted id of a given Author
   * @returns {Author | null} the author
   */
  findById(id) {
    return this.authors.find((author) => author.id === id);
  }

  /**
   * Add an author
   *
   * @param {CreateAuthorDto} createAuthorDto dto for the creation of an author
   * @returns {Author | null} the author added
   */
  addAuthor(createAuthorDto) {
    const { name, countryCode } = createAuthorDto;
    let { id } = createAuthorDto;

    if (!id) {
      this.maxId += 1;
      id = this.maxId;
    } else if (this.findById(id)) {
      return null;
    } else {
      this.maxId = Math.max(this.maxId, id);
    }
    const author = new Author(id, name, countryCode);
    this.authors.push(author);
    return author;
  }

  /**
   * Adds an empty author with only a given id
   *
   * @param {number} id author id for empty author
   * @returns {Author | null} the author added
   */
  addEmptyAuthor(id) {
    const author = new Author(id, '', '');
    return this.addAuthor(author);
  }

  /**
   * Updates a given author
   *
   * @param {number} id the id of author being updated
   * @param {updateAuthorDto} updateAuthorDto update dto to be used
   * @returns {Author | null} The updated author
   */
  updateAuthor(id, updateAuthorDto) {
    const authorIdx = this.authors.findIndex((author) => author.id === id);
    if (authorIdx < 0) {
      return null;
    }
    Object.assign(this.authors[authorIdx], updateAuthorDto);
    return this.authors[authorIdx];
  }

  /**
   * Remove a given author with id
   *
   * @param {number} id Associeted id of a given Author
   * @returns {Author | null} the author
   */
  removeById(id) {
    const authorIdx = this.authors.findIndex((author) => author.id === id);

    if (authorIdx < 0) {
      return null;
    }
    return this.authors.splice(authorIdx, 1)[0];
  }
}
module.exports = new AuthorsService();
