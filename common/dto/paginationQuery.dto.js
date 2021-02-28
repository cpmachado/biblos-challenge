const Joi = require('joi');

function paginationQueryDtoFactory(defaultOrder, validOrder) {
  const paginationQueryDto = Joi.object({
    per_page: Joi.number().positive().optional().default(0),
    page: Joi.number().positive().optional().default(1),
    order: Joi.string().valid(...validOrder).optional().default(defaultOrder),
    sort: Joi.string().valid('desc', 'asc').optional().default('asc'),
  });
  return paginationQueryDto;
}

module.exports = paginationQueryDtoFactory;
