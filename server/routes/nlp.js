const express = require('express');
const { OpenAI } = require('@openai/api');
const Langchain = require('langchain-js');
const Pinecone = require('@pinecone-io/client-nodejs');

const router = express.Router();

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const langchain = new Langchain();
const pinecone = new Pinecone(process.env.PINECONE_API_KEY);

router.post('/nlp', async (req, res) => {
    try {
        const { text } = req.body;
        const chunks = await langchain.getChunks(text);
        const embeddings = await openai.embed(chunks);
        const vectors = embeddings.map(embedding => embedding.vector);
        const ids = await pinecone.addItems(vectors);
        res.send(ids);
    } catch (err) {
        res.status(422).send(err);
    }
});

router.get('/search/:query', async (req, res) => {
    try {
        const { query } = req.params; // added missing '='
        const embeddings = await openai.embed([query]);
        const vector = embeddings[0].vector;
        const { ids, scores } = await pinecone.query(vector); // corrected typo
        const items = await pinecone.getItems(ids);
        const results = items.map((item, index) => {
            return {
                id: item.id,
                score: scores[index], // corrected typo
                text: item.data.text,
            };
        });
        res.send(results);
    } catch (err) {
        res.status(422).send(err);
    }
});

module.exports = router;
