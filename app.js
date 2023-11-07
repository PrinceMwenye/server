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
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    credentials: true,
}));

app.use('/api/v1/definition', definitionsRoute);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});