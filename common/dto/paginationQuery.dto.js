const Joi = require('joi');

function paginationQueryDtoFactory(defaultOrder, validOrder) {
  const paginationQueryDto = Joi.object({
    perPage: Joi.number().positive().optional().default(20),
    page: Joi.number().positive().optional().default(1),
    order: Joi.string().valid(...validOrder).optional().default(defaultOrder),
    sort: Joi.string().valid('desc', 'asc').optional().default('asc'),
  }).rename('per_page', 'perPage', {
    override: true,
  });
  return paginationQueryDto;
}

module.exports = paginationQueryDtoFactory;
