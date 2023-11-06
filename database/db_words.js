const database = require("../mySQLDatabaseConnection.js");

const messages = require('./utils/messages.json');


const insertWord = async (postData) => {
  console.log(postData)
  const wordSQL = `
    INSERT INTO Entry (word, definition, language_id) VALUES (:word, :definition, :language_id);

    `;

  const param = {
    word: postData.word,
    definition: postData.definition,
    language_id: postData.language_id
  };

  try {
    const results = await database.query(wordSQL, param);
    return results[0][0];
  } catch (err) {
    console.log(messages.ERROR_INSERT_WORD);
    console.log(err);
    return;
  }
};


const getLanguageId = async (language) => {

  const wordSQL = `
    SELECT language_id FROM language
    WHERE language = :language

    `;

  const param = {
    language: language,

  };
  try {
    const results = await database.query(wordSQL, param);
    return results[0][0].language_id;
  } catch (err) {
    console.log(messages.ERROR_RETRIEVE_WORD_ID);
    console.log(err);
    return;
  }
};


const checkWordExists = async (word) => {

  const wordSQL = `
    SELECT word FROM entry
    WHERE word = :word

    `;

  const param = {
    word: word,

  };
  try {
    const results = await database.query(wordSQL, param);
    return results[0].length > 0;
  } catch (err) {
    console.log(messages.ERROR_RETRIEVE_WORD_ID);
    console.log(err);
    return;
  }
};

const getDefinition = async (word) => {
  const wordSQL = `
    SELECT definition FROM entry
    WHERE word = :word
  `;

  const param = {
    word: word,
  };

  try {
    const results = await database.query(wordSQL, param);
    // Log the raw results to inspect the structure
    console.log(messages.LOG_RAW_RESULTS, results);

    // Check if the first element of the results array is defined
    if (results[0] && results[0].length > 0) {
      return results[0][0].definition;
    } else {
      // No results found, or the results array is not structured as expected
      console.log(messages.NO_RESULTS_FOUND_OR_UNEXPECTED_STRUCTURE, results);
      return null;
    }
  } catch (err) {
    console.log(messages.ERROR_RETRIEVE_DEFINITION);
    console.log(err);
    return null;
  }
};



const updateDefinition = async (postData) => {
  const wordSQL = `
    UPDATE entry
    SET definition = :newDefinition
    WHERE word = :word;
  `;

  const param = {
    word: postData.word,
    newDefinition: postData.newDefinition,
  };

  try {
    const result = await database.query(wordSQL, param);

    if (result.affectedRows > 0) {
      console.log(messages.SUCCESS_UPDATE_DEFINITION)
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(messages.ERROR_FAILED_UPDATE);
    console.log(err);
    return false;
  }
};

const deleteWord = async (word) => {
  const deleteSQL = `DELETE FROM entry WHERE word = :word;`;
  const param = { word: word };

  try {
    const result = await database.query(deleteSQL, param);
    console.log(messages.LOG_DELETE_RESULT, result); // Log the full result to inspect its structure

    // Assuming result is an array with the query result at the first position
    if (result && result[0] && result[0].affectedRows > 0) {
      return true; // Returns true if a word was deleted, false otherwise
    } else {
      return false;
    }
  } catch (err) {
    console.error(messages.ERROR_DELETE_WORD, err);
    throw err; // Throw the error to be caught by the router
  }
};




const getLanguages = async () => {
  const languageSQL = `
    SELECT DISTINCT(language)
    FROM langague
  `;


  try {
    const results = await database.query(languageSQL);
    return results[0][0].language;

  } catch (err) {
    console.log(messages.ERROR_FAILED_UPDATE);
    console.log(err);
    return false;
  }
};

module.exports = {
  insertWord,
  getLanguageId,
  checkWordExists,
  getDefinition,
  updateDefinition,
  deleteWord,
  getLanguages,
};