const express = require('express');
const router = express.Router();
const chatGPTConfig = require('../config/chatGPTConfig');
const { Configuration, OpenAIApi } = require('openai');
const readline = require('readline');
const bodyParser = require('body-parser');
const cors = require('cors');

const configuration = new Configuration({
    apiKey: chatGPTConfig.chatGPTkey,
});

const openai = new OpenAIApi(configuration);
const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

router.use(bodyParser.json());
router.use(cors());

router.post('/', async (req, res) => {
    const { message } = req.body;
    console.log(message);
    userInterface.prompt();
    userInterface.on("line", async input => {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "user", content: input}
            ]
        })
        res.send(completion.data.choices[0].message);
        userInterface.prompt();
    })

})

module.exports = router;