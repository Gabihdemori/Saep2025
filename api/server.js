const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;
const router = require('./src/router');

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
    console.log(`Seridor respondendo http://localhost:${port}`);
});