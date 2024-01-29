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
    // Check if the input is a valid numeric grade
    if (!grades.every(grade => grade <= 100)) {
        // Redirect to the same page with error message as query parameter
        return res.redirect('/?error=Please enter valid numeric grades less equal to 100');
    }

    // Check if the input is a valid numeric ID with up to 9 digits
    if (isNaN(parseInt(name)) || name.length != 9) {
        // Redirect to the same page with error message as query parameter
        return res.redirect('/?error=Please enter a valid numeric ID with 9 digits');
    }
    // Check if the input is a valid numeric grade
    if (!grades.every(grade => !isNaN(grade))) {
        // Redirect to the same page with error message as query parameter
        return res.redirect('/?error=Please enter valid numeric grades less equal to 100');
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
    // Assuming you want to redirect to '/keys' after processing the POST request
    res.redirect('/keys');
});


// Express route to retrieve all data from Redis and display as a table
app.get('/keys', (req, res) => {
    const redisClient = createClient({
        password: 'i4qy8JGPQPvwuc4ujHOm7UoCtHs7fZnd',
        host: 'redis-15461.c326.us-east-1-3.ec2.cloud.redislabs.com',
        port: 15461
    });
    
    // Use the KEYS command to retrieve all keys
    redisClient.keys('*', (err, keys) => {
        if (err) {
            console.error('Error retrieving keys from Redis:', err);
            return res.status(500).send('Error retrieving keys from Redis');
        }
        
        // Iterate over each key and retrieve its value
        const data = [];
        let counter = 0;
        keys.forEach(key => {
            redisClient.get(key, (err, value) => {
                if (err) {
                    console.error(`Error retrieving value for key ${key}:`, err);
                    return res.status(500).send(`Error retrieving value for key ${key}`);
                }
                data.push({ key, value }); // Store the key-value pair in the data array

                // Check if all values have been retrieved
                counter++;
                if (counter === keys.length) {
                    // Close the Redis client after retrieving all data
                    redisClient.quit(() => {
                        // Render the HTML table
                        const tableHtml = generateTableHtml(data);
                        res.send(tableHtml);
                    });
                }
            });
        });
    });
});

// Function to generate HTML table from JSON data
function generateTableHtml(data) {
    let tableHtml = `
        <html>
        <head>
            <title>Redis Data</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
            </style>
        </head>
        <body>
            <h1>Redis Data</h1>
            <table>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
    `;

    data.forEach(item => {
        tableHtml += `<tr><td>${item.key}</td><td>${item.value}</td></tr>`;
    });

    tableHtml += `
            </table>
        </body>
        </html>
    `;
    return tableHtml;
}



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

function calculateGPA(grades) {
    const totalPoints = grades.reduce((sum, grade) => sum + grade, 0);
    const gpa = totalPoints / grades.length;
    return gpa.toFixed(2);
}
