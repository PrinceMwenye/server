
const express = require('express');
const router = express.Router();
const db_words = require('../database/db_words');


router.post('/', async (req, res) => {
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

router.patch('/:word', async (req, res) => {
    try {
      const word = req.params.word; 
      const definition = req.body.definition;
  
      if (!definition) {
        return res.status(400).json({ error: 'Definition is required.' });
      }
  
    
      await db_words.updateDefinition({
        word: word,
        newDefinition: definition
      });
  
      res.status(200).json({ message: 'Definition updated successfully.' });
    } catch (error) {
      console.error('Error updating definition:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
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