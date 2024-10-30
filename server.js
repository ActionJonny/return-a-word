const express = require("express");
const fs = require('fs');
require('dotenv').config();

const axios = require('axios');
const API_KEY = process.env.API_KEY;

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (request, response) => {
	fs.readFile(`${__dirname}/index.html`, (err, file) => {
		response.send(file);
	});
});

app.get('/word', async (request, response) => {
	try {
		const apiResponse = await axios
			.get(`https://api.wordnik.com/v4/words.json/randomWord?api_key=${API_KEY}`);
		const data = await apiResponse.data;
		return response.send(data.word);
	} catch (error) {
		console.error('Error fetching word:', error);
	}
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}!`);
});