const { createClient } = require('redis');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', async (req, res) => {
    const name = req.body.name;

    const mathGrade = parseInt(req.body.math.trim(), 10) || 0;
    const englishGrade = parseInt(req.body.english.trim(), 10) || 0;
    const hebrewGrade = parseInt(req.body.hebrew.trim(), 10) || 0;
    const bibleGrade = parseInt(req.body.bible.trim(), 10) || 0;
    const cultureGrade = parseInt(req.body.culture.trim(), 10) || 0;
    const physicsGrade = parseInt(req.body.physics.trim(), 10) || 0;
    const computerscienceGrade = parseInt(req.body.computerscience.trim(), 10) || 0;
    const historyGrade = parseInt(req.body.history.trim(), 10) || 0;
    const citizenshipGrade = parseInt(req.body.citizenship.trim(), 10) || 0;

    const grades = [mathGrade, englishGrade, hebrewGrade, bibleGrade, cultureGrade, physicsGrade, computerscienceGrade, historyGrade, citizenshipGrade];

    if (!grades.every(grade => !isNaN(grade))) {
        return res.sendFile(path.join(__dirname, 'public', 'index.html'), { error: 'Please enter valid numeric grades.' });

    }

    const gpa = calculateGPA(grades);

    const redisClient = createClient({
        password: 'i4qy8JGPQPvwuc4ujHOm7UoCtHs7fZnd',
        host: 'redis-15461.c326.us-east-1-3.ec2.cloud.redislabs.com',
        port: 15461
    });
    
    const redisKey = `${name}_grades`;

    try {
        await new Promise((resolve, reject) => {
            redisClient.set(redisKey, `Name: ${name}, GPA: ${gpa}`, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

        redisClient.quit();

        res.sendFile(path.join(__dirname, 'public', 'index.html'), { name, gpa, redisData: redisKey });
        console.log('Data has entered to REDIS!')
    } catch (error) {
        console.error('Error storing data in Redis:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

function calculateGPA(grades) {
    const totalPoints = grades.reduce((sum, grade) => sum + grade, 0);
    const gpa = totalPoints / grades.length;
    return gpa.toFixed(2);
}