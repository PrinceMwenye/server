const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const definitionsRoute = require('./routes/definition');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(bodyParser.json());

app.use('/api/v1/definition', definitionsRoute);


app.use(cors({
    origin: 'https://clientlab6-dd9cafc8770e.herokuapp.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});