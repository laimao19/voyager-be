const express = require('express');
const router = express.Router();

router.post('/',async (req, res, next) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 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");

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