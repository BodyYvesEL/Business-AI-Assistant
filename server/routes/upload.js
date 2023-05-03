const express = require('express');
const multer = require('multer');
const PDFParser = require('pdf-parse');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { originalname, buffer } = req.file;
        const extension = originalname.split('.').pop().toLowerCase();
        if (extension === 'pdf') {
            const data = await PDFParser(buffer);
            res.send(data.text);
        } else {
            throw new Error('Invalid file format');
        }
    } catch (err) {
        res.status(422).send(err);
    }
});

module.exports = router;