const database = require("../mySQLDatabaseConnection.js");


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
    console.log("Error failed to insert word");
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
    console.log("Error failed to retrieve word id");
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
    console.log("Error failed to retrieve word id");
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
    return results[0][0].definition;
  } catch (err) {
    console.log("Error failed to retrieve word id");
    console.log(err);
    return;
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
      console.log("Update success")
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("Error failed to update");
    console.log(err);
    return false;
  }
};


const deleteWord = async (word) => {
  const deleteSQL = `
    DELETE FROM entry
    WHERE word = :word;
  `;

  const param = {
    word: word,

  };

  try {
    const result = await database.query(deleteSQL, param);

    if (result.affectedRows > 0) {
      console.log("Delete success")
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("Error failed to update");
    console.log(err);
    return false;
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
    console.log("Error failed to update");
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
  getLanguages
};