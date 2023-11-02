const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const definitionsRoute = require('./routes/definition');
const app = express();
const port = process.env.PORT || 3000; // You can set a custom port or use 3000
const cors = require('cors');
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // You can include this if needed
}));


app.use('/api/v1/definition', definitionsRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});