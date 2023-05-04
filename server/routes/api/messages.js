const express = require('express');
const router = express.Router();
const pinecone = require('pinecone-node');
const { v4: uuidv4 } = require('uuid');
const { Message } = require('../../models');
const { OpenAI } = require('@openai/api');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

router.get('/', async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { text, fileUrl } = req.body;
        const embedding = await pinecone.embed(text);
        const message = await Message.create({
            id: uuidv4(),
            text,
            fileUrl,
            embedding,
        });
        res.json(message);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/question', async (req, res) => {
    try {
        const { question } = req.body;
        const messages = await Message.findAll();
        const texts = messages.map((message) => message.text);
        const embeddings = messages.map((message) => message.embedding);
        const results = await openai.completions.create({
            engine: 'text-davinci-002',
            prompt: question,
            maxTokens: 256,
            n:1,
            stop: ['\n'],
            presence_penalty: 0.6,
            frequency_penalty: 0.6,
            context: texts,
            embeddings: embeddings,
        });
        const answer = results.choices[0].text.trim();
        res.json({ answer });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;