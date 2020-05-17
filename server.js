const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const errorMidlleware = require('./server/middlewares/error');
const loggerMiddleware = require('./server/middlewares/logger');
const router = require('./server/routes');
const { PORT } = require('./server/common/config');
const logger = require('./server/common/winston');

const app = express();
const dir = path.join(__dirname, 'build');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(dir));

app.use(loggerMiddleware);
app.use('/', router);
app.use(errorMidlleware);

process.on('uncaughtException', (err) => {
  logger.error({ statusCode: 500, message: err.message });
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error({ statusCode: 500, message: reason.message });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}/`));
