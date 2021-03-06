const paginationQueryDtoFactory = require('./dto/paginationQuery.dto');

/**
 * Numeric Sorting function for Array.sort
 * @param {string} prop name of property being sorted
 * @returns {function} sorting function
 */
function sortNumeric(prop) {
  return (a, b) => a[prop] - b[prop];
}

/**
 * Alphabetic Sorting function for Array.sort
 * @param {string} prop
 * @returns {function} sorting function
 */
function sortAlphabetic(prop) {
  return (a, b) => {
    let aValue = a[prop];
    let bValue = b[prop];

    if (!aValue) {
      return -1;
    }

    if (!bValue) {
      return -1;
    }
    aValue = aValue.toLowerCase();
    bValue = bValue.toLowerCase();

    if (aValue < bValue) {
      return -1;
    }
    return Number(aValue < bValue);
  };
}

class PaginationService {
  /**
   * Pagination service over arrays
   * @param {Array<{name: string, type: string}>} orderProps sortable properties
   * @returns {PaginationService} instance
   */
  constructor(orderProps) {
    const validOrders = orderProps.map((prop) => prop.name);
    const defaultOrder = validOrders[0];
    this.props = orderProps;
    this.paginationQueryDtoValidator = paginationQueryDtoFactory(defaultOrder, validOrders);
  }

  /**
   * Validates a given PaginationQueryDto
   * @param {PaginationQueryDto} paginationQueryDto paginationQueryDto to be validated
   * @returns {object} Joi validation property
   */
  validate(paginationQueryDto) {
    return this.paginationQueryDtoValidator.validate(paginationQueryDto);
  }

  /**
   * Paginates a given array
   * @param {Array<T>} array array to be paginated
   * @param {PaginationQueryDto} paginationQueryDto pagination dto
   * @returns {Array<T>} paginated
   */
  paginate(array, paginationQueryDto) {
    const { order, sort, page } = paginationQueryDto;
    const { perPage } = paginationQueryDto;
    const sortProp = this.props.find((prop) => prop.name === order);
    const sortFn = sortProp.type === 'number' ? sortNumeric : sortAlphabetic;
    array.sort(sortFn(sortProp.name));
    if (sort === 'desc') {
      array.reverse();
    }
    const firstItem = (page - 1) * perPage;
    const endItem = firstItem + perPage;
    return array.slice(firstItem, endItem);
  }
}

module.exports = PaginationService;
