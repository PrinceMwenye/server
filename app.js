
const express = require('express');
const bodyParser = require('body-parser');
const definitionsRoute = require('./routes/definitions');
const app = express();
const port = process.env.PORT || 3000; // You can set a custom port or use 3000

app.use(bodyParser.json());

app.use('/api/v1/definition', definitionsRoute);

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
