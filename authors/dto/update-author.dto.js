const Joi = require('joi');
const countryMapper = require('../../data/countries.json');

const countryCodes = Object.keys(countryMapper);

const UpdateAuthorDto = Joi.object({
  name: Joi.string().optional(),
  countryCode: Joi.string().valid(...countryCodes).optional(),
});

module.exports = UpdateAuthorDto;
