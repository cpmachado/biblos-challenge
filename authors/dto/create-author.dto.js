const Joi = require('joi');
const countryMapper = require('../../data/countries.json');

const countryCodes = Object.keys(countryMapper);

const CreateAuthorDto = Joi.object({
  name: Joi.string().required(),
  countryCode: Joi.string().valid(...countryCodes).insensitive().required(),
});

module.exports = CreateAuthorDto;
