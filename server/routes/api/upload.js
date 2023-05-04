const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { chunkText } = require('langchain');

const storage = multer.disk
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename:function (req, file, cb) {
            const filename = uuidv4() + '-' + file.originalname;
            cb(null, filename);
        },
    }),
});

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const { path } = req.file;
        const data = fs.readFileSync(path, 'utf8');
        const chunks = chunkText(data);
        res.json({
            name: req.file.originalname,
            url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
            chunks,
        });
        fs.unlinkSync(path);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;