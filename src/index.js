const functions = require('firebase-functions');
// const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const fs = require('fs');
const os = require('os');

const path = require('path');
const morgan = require('morgan');
// path.join(os.tmpdir(), fileName);
const LogStream = fs.createWriteStream(path.join(os.tmpdir(), 'logs.log'), { flags: 'a' });

const jsonxml = require('jsonxml');
const app = express();
const estimator = require('./estimator');
// const requestLogger = require('./filehelper');
const logString = ':response-time' + 'ms';
// `:method\t\t:url\t\t:status\t\t:response-time`
app.use(morgan(':method\t\t:url\t\t:status\t\t:response-time' + 'ms', { stream:LogStream }));


// app.use(requestLogger);



app.use(cors({ origin: true }));

// app.use(requestLogger);


app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});

app.get('/api/v1/on-covid-19', (req, res) => {
    (async () => {
        try {

            let data = req.params;

            const response 
            = estimator.covid19ImpactEstimator(data);
           
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

app.post('/api/v1/on-covid-19', (req, res) => {
    (async () => {
        try {

            let data = req.body;

            const response 
            = estimator.covid19ImpactEstimator(data);
            
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

app.post('/api/v1/on-covid-19/json', (req, res) => {
    (async () => {
        try {

            let data = req.body;

            const response 
            = estimator.covid19ImpactEstimator(data);
            res.set('Content-Type', 'application/json');
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

app.post('/api/v1/on-covid-19/xml', (req, res) => {
    (async () => {
        try {

            let data = req.body;

            const response 
            = estimator.covid19ImpactEstimator(data);
            res.set('Content-Type', 'application/xml');
            return res.status(200).send(jsonxml([response]));
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });


app.get('/api/v1/on-covid-19/logs',(req,res)=>{
    const path = os.tmpdir() +'/logs.log';
    let logs = "";
    if(!fs.existsSync(path)){fs.writeFileSync(path,'')}
    fs.readFile(path, 'utf8', (err,data) =>{
        if(err){ throw err}
        const splitted = data.split("\n");
        for (let index = 0; index < splitted.length; index++) {
            if(splitted[index] !== ""){
                logs += splitted[index]+"\n";
            }
        }
        res.send(logs);
        }
    );
    
});

exports.app = functions.https.onRequest(app);