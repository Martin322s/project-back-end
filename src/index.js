const express = require('express');
const { initializeDatabase } = require('../config/database');
const app = express();
const port = 3030;

initializeDatabase()
    .then(() => {
        console.log(">>>>> Database connected successfully! <<<<<");
        app.listen(port, () => console.log(`>> *Server is working at: http://localhost:${port} * <<`));
    })
    .catch(err => {
        console.log('>>>>> Database connection error <<<<<');
        console.log('Error: ' + err.message);
    });