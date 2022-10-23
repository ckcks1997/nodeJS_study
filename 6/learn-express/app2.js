const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
//use if you need raw/text data parser
const bosyParser = require('body-parser');

const app = express();
dotenv.config();
//포트설정
app.set('port', process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(
    (req, res, next) => {
        if(process.env.NODE_ENV === 'production')
            morgan('production')(req, res, next);
         else 
            morgan('dev')(req, res, next);
    },
    express.json(),
    express.urlencoded({extended: false}),
    cookieParser(process.env.COOKIE_SECRET),
    (req, res, next) => {
        console.log('모든 요청에 다 실행됨.')
        next();
    },
); 
app.use(session({
    resave: false,
    saveUninitialized: false,
     secret: process.env.COOKIE_SECRET,
     cookie:{
        httpOnly: true, //JS can't use this cookie.
        secure: false // can use http env. 
     }
}));

app.get('/', (req, res) => {
    req.session.name = 'zerocho';
    console.log("sessionId:"+req.sessionID);
    //req.session.destroy;
    console.log(req.headers.cookie);
    //new cookie
    res.cookie('name', 'zerocho', {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
        secure: true,
        signed: true
    });
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중');
});