const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Replace with your desired port number

app.use(bodyParser.json());

// Define a simple in-memory database for this example (you should use a real database)
const dictionary = [];

// POST endpoint to create a new dictionary entry
app.post('/api/v1/definition', (req, res) => {
    const entry = req.body;

    // Check if the word already exists
    const existingEntry = dictionary.find(item => item.word === entry.word);
    if (existingEntry) {
        // If it exists, return a conflict response
        return res.status(409).json({
            error: "Word conflict",
            message: `The word "${entry.word}" already exists.`,
            entry: existingEntry,
            total: dictionary.length
        });
    }

    // If the word doesn't exist, add it to the dictionary
    dictionary.push(entry);

    res.status(201).json({
        message: 'Entry created successfully',
        entry,
        total: dictionary.length
    });
});

// PATCH endpoint to update the definition of an existing word
app.patch('/api/v1/definition/:word', (req, res) => {
    const wordToUpdate = req.params.word;
    const updatedDefinition = req.body.definition;

    const existingEntry = dictionary.find(item => item.word === wordToUpdate);
    if (!existingEntry) {
        return res.status(404).json({
            error: "Entry Not Found",
            message: `The word "${wordToUpdate}" does not exist in the dictionary.`,
            total: dictionary.length
        });
    }

    // Update the definition for the existing word
    existingEntry.definition = updatedDefinition;

    res.status(200).json({
        message: 'Definition updated successfully',
        entry: existingEntry,
        total: dictionary.length
    });
});

// GET endpoint to retrieve the definition of a word
app.get('/api/v1/definition/:word', (req, res) => {
    const wordToRetrieve = req.params.word;

    const existingEntry = dictionary.find(item => item.word === wordToRetrieve);
    if (!existingEntry) {
        return res.status(404).json({
            error: "Entry Not Found",
            message: `The word "${wordToRetrieve}" does not exist in the dictionary.`,
            total: dictionary.length
        });
    }

    res.status(200).json({
        definition: existingEntry.definition
    });
});

// DELETE endpoint to remove a word and its definition
app.delete('/api/v1/definition/:word', (req, res) => {
    const wordToDelete = req.params.word;

    const existingEntryIndex = dictionary.findIndex(item => item.word === wordToDelete);
    if (existingEntryIndex === -1) {
        return res.status(404).json({
            error: "Entry Not Found",
            message: `The word "${wordToDelete}" does not exist in the dictionary.`,
            total: dictionary.length
        });
    }

    // Remove the word and its definition
    dictionary.splice(existingEntryIndex, 1);

    res.status(200).json({
        message: 'Entry deleted successfully',
        total: dictionary.length
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});