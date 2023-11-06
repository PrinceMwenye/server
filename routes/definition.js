const express = require('express');
const router = express.Router();
const db_words = require('../database/db_words');
const messages = require('./utils/messages.json');



router.post('/', async (req, res) => {
    console.log("inside get")
    const word = req.body.word;
    const wordExists = await db_words.checkWordExists(word)
    if (wordExists) {
        console.log(messages.LOG_WORD_ALREADY_EXISTS)
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
        console.log(messages.LOG_ADDED_DEFINITION_FOR_WORD, word);
    }
});

router.patch('/:word', async (req, res) => {
    try {
        const word = req.params.word;
        const definition = req.body.definition;

        if (!definition) {
            return res.status(400).json({
                error: ERROR_DEmessages.ERROR_DEFINITION_REQUIREDFINITION_REQUIRED
            });
        }


        await db_words.updateDefinition({
            word: word,
            newDefinition: definition
        });

        res.status(200).json({
            message: messages.MESSAGE_DEFINITION_UPDATED_SUCCESSFULLY
        });
    } catch (error) {
        console.error(messages.ERROR_UPDATING_DEFINITION, error);
        res.status(500).json({
            error: messages.ERROR_INTERNAL_SERVER
        });
    }
});


router.get('/:word', async (req, res) => {
    const word = req.params.word;
    console.log(messages.LOG_INSIDE_GET)
    try {
        const definition = await db_words.getDefinition(word);

        if (definition) {
            res.json({
                word,
                definition
            });
        } else {
            res.status(404).json({
                message: messages.ERROR_WORD_NOT_FOUND 
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: messages.ERROR_INTERNAL_SERVER
        });
    }

});

router.delete('/:word', async (req, res) => {
  const wordToDelete = req.params.word;
  try {
      const deletionResult = await db_words.deleteWord(wordToDelete);

      if (deletionResult) {
          res.status(204).send(); // No content to send back, but successful deletion
      } else {
          res.status(404).json({
              message: `Word '${wordToDelete}' not found in the dictionary.`
          });
      }
  } catch (error) {
      console.error(messages.ERROR_DELETING_WORD, error);
      res.status(500).json({
          error: messages.ERROR_INTERNAL_SERVER
      });
  }
});



router.get('/languages', async (req, res) => {
    try {
        const languages = await db_words.getLanguages();

        if (languages) {
            res.status(200).json({
                languages
            });
        } else {
            res.status(500).json({
                error: messages.ERROR_INTERNAL_SERVER
            });
        }
    } catch (error) {
        console.error(messages.ERROR_FETCHING_LANGUAGES, error);
        res.status(500).json({
            error: messages.ERROR_INTERNAL_SERVER
        });
    }
});
module.exports = router;