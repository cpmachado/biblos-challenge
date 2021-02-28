const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const baseMiddlewares = [
  bodyParser.json({
    limit: '20mb',
  }),
];

app.use(baseMiddlewares);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening on http://127.0.0.1:${port}`));
