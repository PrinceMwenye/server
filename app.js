// const express = require('express');
// require("dotenv").config();
// const bodyParser = require('body-parser');
// const definitionsRoute = require('./routes/definition');
// const app = express();
// const port = process.env.PORT || 3000;
// const cors = require('cors');
// app.use(bodyParser.json());



// app.use(cors({
//     origin: 'https://clientlab6-dd9cafc8770e.herokuapp.com',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
// }));

// app.use('/api/v1/definition', definitionsRoute);


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const definitionsRoute = require('./routes/definition');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors({
    origin: 'https://clientlab6-dd9cafc8770e.herokuapp.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use('/api/v1/definition', definitionsRoute);

// Set the CORS headers for all routes
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://clientlab6-dd9cafc8770e.herokuapp.com");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});