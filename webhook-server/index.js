var express = require('express')
var cors = require('cors');
var axios = require('axios');

var app = express();
app.use(cors(
    {
        origin : ['http://localhost:8010','http://localhost:8020','http://localhost:8030',]
    }
));

let callbacks = [];

app.post('/register-event', async (req, res)=>{
    console.log('POST @ register-event');
    let event = req.query.event;
    for(let url of callbacks) {
        await axios.post(url, {}, {
            params : {
                event
            }
        })
    }
    res.status(200).json("success");
});

app.post('/register-callback', async (req, res)=>{
    console.log('POST @ register-callback', req.query.callback);
    let callback = req.query.callback;
    callbacks.push(callback);
    res.status(200).json("success");
});

app.listen(8080, ()=>{
    console.log('Webhook server live on port 8080');
})