const express = require('express');
const bodyParser = require('body-parser');
const httpLogger = require('morgan');

const { errorNotFoundMiddleware, errorHandlingMiddleware } = require('./util/error');
const logger = require('./util/logger');
const { authorsController } = require('./authors');

const app = express();
const port = 3000;

const baseMiddlewares = [
  bodyParser.json({
    limit: '20mb',
  }),
];

// disable unused headers
app.disable('x-powered-by');
app.disable('etag');

// add some request logging
app.use(httpLogger('combined'));

app.use(baseMiddlewares);

// middleware
app.use('/authors', authorsController);

// error handling middleware
app.use(errorNotFoundMiddleware);
app.use(errorHandlingMiddleware);

app.listen(port, () => logger.info(`[!!] App listening on http://127.0.0.1:${port}`));
