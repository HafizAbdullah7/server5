const express = require('express');
const cors = require('cors');
const path = require('path');
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

const port = process.env.PORT || 4000; // Use the provided PORT from Vercel or default to 4000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
