const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const LOG_DIR = path.join(__dirname, '../logs');
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

const setupLogIngestor = (io) => {
    router.post('/', (req, res) => {
        try {
            const logData = req.body;
            const source = logData.metadata.source;
            const logFilePath = path.join(LOG_DIR, source);

            fs.appendFileSync(logFilePath, JSON.stringify(logData) + '\n');
            io.emit('new_log', logData);

            res.status(200).send('Log entry successfully ingested.');
        } catch (error) {
            console.error(`Error in ingesting log entry: ${error}`);
            res.status(500).send('Error in ingesting log entry.');
        }
    });

    return router;
};

module.exports = setupLogIngestor;
