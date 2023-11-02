// server2/routes/definitions.js
const express = require('express');
const router = express.Router();
const db_words = require('../database/db_words');


// Import database functions and error handling logic here

router.post('/', async (req, res) => {
    console.log(req.body)
    const word = req.body.word;
    // TODO: Check if word already exists
    const definition = req.body.definition;
    const language = req.body.wordLanguage;
    const language_id = await db_words.getLanguageId(language)
    console.log(language_id)
    const insertWord = await db_words.insertWord({word:word, definition:definition, language_id:language_id})
    // Implement validation, insertion, and error handling here

    // console.log("Adding definition for word:", word);
});

router.patch('/:word', (req, res) => {
    // Handle PATCH request to update the definition of an existing word
    // Implement validation, update, and error handling here
});

router.get('/:word', (req, res) => {
    // Handle GET request to retrieve the definition of a word
    // Implement database query, error handling, and response here
});

router.delete('/:word', (req, res) => {
    // Handle DELETE request to remove a word and its definition
    // Implement database deletion, error handling, and response here
});

router.get('/languages', (req, res) => {
    // Handle GET request to retrieve the list of languages
    // Implement querying the 'language' table, error handling, and response here
});

module.exports = router;