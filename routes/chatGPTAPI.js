const express = require('express');
const router = express.Router();
const chatGPTConfig = require('../config/chatGPTConfig');

router.post('/',async (req, res, next) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + chatGPTConfig.chatGPTkey);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    let rawData = await fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .then(chatData => res.json(chatData))
        .catch(error => console.log('error', error));
});

module.exports = router;