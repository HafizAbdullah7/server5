const express = require('express');
const cors = require('cors');
const path = require('path'); // Import the 'path' module
const ytdl = require('ytdl-core');
const app = express();

app.use(cors());

// Serve the React app from the build folder
app.use(express.static(path.join(__dirname, 'build')));

app.get('/download', (req, res) => {
  const url = req.query.url;
  ytdl(url, { filter: (format) => format.container === 'mp4' }).pipe(res);
});

app.get('/', (req, res) => {
  // Send the index.html file from the build folder
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
