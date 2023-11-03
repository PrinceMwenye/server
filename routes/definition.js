// server2/routes/definitions.js
const express = require('express');
const router = express.Router();
const db_words = require('../database/db_words');


// Import database functions and error handling logic here

router.post('/', async (req, res) => {
    console.log(req.body)
    const word = req.body.word;
    const wordExists = await db_words.checkWordExists(word)
    if (wordExists) {
        console.log("Word already exists.")
    } else {
        const definition = req.body.definition;
        const language = req.body.wordLanguage;
        const language_id = await db_words.getLanguageId(language)
        console.log(language_id)
        await db_words.insertWord({
            word: word,
            definition: definition,
            language_id: language_id
        })
        console.log("Added definition for word:", word);
    }
});

router.patch('/:word', (req, res) => {
    // Handle PATCH request to update the definition of an existing word
    // Implement validation, update, and error handling here
});

router.get('/:word', async (req, res) => {
    const word = req.params.word;
    console.log("inside GET")
    try {
        const definition = await db_words.getDefinition(word);

        if (definition) {
            res.json({
                word,
                definition
            });
        } else {
            res.status(404).json({
                message: 'Word not found'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }

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