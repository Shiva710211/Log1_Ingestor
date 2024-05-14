const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const LOG_DIR = path.join(__dirname, '../logs');

router.get('/query', (req, res) => {
    try {
        const { level, log_string, start_timestamp, end_timestamp, source } = req.query;

        let logs = [];

        fs.readdirSync(LOG_DIR).forEach(file => {
            if (file.endsWith('.log')) {
                const filePath = path.join(LOG_DIR, file);
                const fileLogs = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
                fileLogs.forEach(log => {
                    try {
                        const logEntry = JSON.parse(log);
                        const logTimestamp = new Date(logEntry.timestamp);
                        const startTime = start_timestamp ? new Date(start_timestamp) : null;
                        const endTime = end_timestamp ? new Date(end_timestamp) : null;

                        if ((!level || logEntry.level === level) &&
                            (!log_string || new RegExp(log_string).test(logEntry.log_string)) &&
                            (!startTime || logTimestamp >= startTime) &&
                            (!endTime || logTimestamp <= endTime) &&
                            (!source || logEntry.metadata.source === source)) {
                            logs.push(logEntry);
                        }
                    } catch (error) {
                        console.error(`Error parsing log: ${error.message}`);
                    }
                });
            }
        });

        res.status(200).json(logs);
    } catch (error) {
        console.error(`Error in querying logs: ${error}`);
        res.status(500).send('Error in querying logs.');
    }
});

router.use(express.static(path.join(__dirname, '../public')));

module.exports = router;
