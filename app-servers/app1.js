var express = require('express')
var cors = require('cors');
var axios = require('axios');

var app = express();
app.use(cors(
    {
        origin : ['http://localhost:3000','http://localhost:8080']
    }
));

let webhookServerEventEndpoint = 'http://localhost:8080/register-event';
let webhookServerCallbackEndpoint = 'http://localhost:8080/register-callback';
let callback = 'http://localhost:8010/callback';

app.post('/register-event', async (req, res)=>{
    console.log('POST @ register-event');
    let event = req.query.event;
    await axios.post(webhookServerEventEndpoint, {}, {
        params : {
            event : `App 1 sent ${event}`
        }
    });
    res.status(200).json("success");
});

app.post('/register-callback', async (req, res)=>{
    console.log('POST @ register-callback');
    await axios.post(webhookServerCallbackEndpoint, {}, {
        params : {
            callback
        }
    });
    res.status(200).json("success");
});

app.post('/callback', async (req, res)=>{
    console.log('POST @ callback');
    console.log('Received data from webhook :', req.query.event);
    res.json("success");
})

app.listen(8010, ()=>{
    console.log('App 1 live on port 8010');
})