const countryMapper = require('../../data/countries.json');

/**
 * Class to define Author type
 * @property {number} id a given id
 * @property {string} name author's name
 * @property {string} countryCode author's country code of origin
 */
class Author {
  /**
   * Constructor of the Author Type
   *
   * @param {number} id author's id
   * @param {string} name author's name
   * @param {string} countryCode author's countryCode
   * @returns {Author} Author instance
   */
  constructor(id, name, countryCode) {
    this.id = id;
    this.name = name;
    this.countryCode = countryCode;
  }

  /**
   * Returns plain object with author's details,
   * with country property instead of countryCode.
   * @returns {object} Author's details with country
   */
  getWithCountry() {
    const { id, name, countryCode } = this;
    const country = countryMapper[countryCode.toLowerCase()];
    return {
      id,
      name,
      country,
    };
  }
}

module.exports = Author;
