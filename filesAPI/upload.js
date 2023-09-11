const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mime = require('mime-types')
const app = express();
app.use(cors())
// Configure Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const st = removeAccents(req.body.aappma.replace(/\s/g, '').toLowerCase())
    const n = st + '_' + req.body.an + '_' + req.body.index.length + '.' + mime.extension(file.mimetype)
    cb(null, n);
  },
});

const upload = multer({ storage });

// Define a route for uploading files
app.post('/upload', upload.any(), (req, res) => {
  // Send a response to the client
  res.status(200).json({ message: 'File uploaded successfully'});
});
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});