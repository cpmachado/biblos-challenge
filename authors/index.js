const authorsController = require('./authors.controller');
const authorsService = require('./authors.service');
const CreateAuthorDto = require('./dto/create-author.dto');
const UpdateAuthorDto = require('./dto/update-author.dto');
const Author = require('./entities/author.entity');

module.exports = {
  authorsController,
  authorsService,
  Author,
  CreateAuthorDto,
  UpdateAuthorDto,
};
