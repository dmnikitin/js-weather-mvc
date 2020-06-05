const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = require('./server/routes');
const { PORT } = require('./server/config');

const app = express();
const dir = path.join(__dirname, 'build');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(dir));
app.use('/', router);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}/`));
