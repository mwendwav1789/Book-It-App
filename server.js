const express = require('express');
const fetch = require('node-fetch'); // or use axios
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.get('/api/data', (req, res) => {
  fetch(' test.api.amadeus.com', {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: 'Error fetching data' }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${3000}`);
});
