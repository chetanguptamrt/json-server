require("dotenv").config();
const express = require('express');
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const routes = require('./src/routes')
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(routes)

app.use("*", (req, res) => {
    res.status(404).send(`${req.method} ${req.originalUrl} Route not found`)
});

app.use(function (err, req, res, next) {
    res.status(500).send("Oops, something went wrong.")
});

app.listen(PORT || 3000, () => {
    console.log(`Server is start at port ${PORT || 3000}`)
});