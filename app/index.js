const express = require('express');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

const server = app.listen(config.express.port, () => {
    console.log(`Server running on Port ${config.express.port}`);
});