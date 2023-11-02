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


module.exports = {
  insertWord,
  getLanguageId
};