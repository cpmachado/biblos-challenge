const paginationQueryDtoFactory = require('./dto/paginationQuery.dto');

function sortNumeric(prop) {
  return (a, b) => a[prop] - b[prop];
}

function sortAlphabetic(prop) {
  return (a, b) => {
    if (a[prop] < b[prop]) {
      return -1;
    }
    return Number(a[prop] < b[prop]);
  };
}

class PaginationService {
  constructor(orderProps) {
    const validOrders = orderProps.map((prop) => prop.name);
    const defaultOrder = validOrders[0];
    this.props = orderProps;
    this.paginationQueryDto = paginationQueryDtoFactory(defaultOrder, validOrders);
  }

  validate(paginationQueryDto) {
    return this.paginationQueryDto.validate(paginationQueryDto);
  }

  paginate(array, paginationQueryDto) {
    const { order, sort, page } = paginationQueryDto;
    let perPage = paginationQueryDto.per_page;
    let n = array.length;
    if (perPage) {
      n = Math.ceil(array.length / perPage);
    } else {
      perPage = array.length;
    }

    if (page > n) {
      return [];
    }
    const sortProp = this.props.find((prop) => prop.name === order);
    const sortFn = sortProp.type === 'number' ? sortNumeric : sortAlphabetic;
    array.sort(sortFn(sortProp.name));
    if (sort === 'desc') {
      array.reverse();
    }

    return array.slice((page - 1) * perPage, perPage);
  }
}

module.exports = PaginationService;
