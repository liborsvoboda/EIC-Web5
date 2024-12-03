import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';

const app = express();

// Express 3.0
//app.use(express.json({ limit: '10mb' }));
//app.use(express.urlencoded({ limit: '10mb' }));

// Express 4.0
//app.use(bodyParser.json({ limit: '10mb' }));
//app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());


import router from './routes.js'
app.use(router);

app.listen(3000, () => console.log("SqLite Api"));

/*
https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')
}, app).listen(3001, ()=> console.log("Rodando em https"));
*/