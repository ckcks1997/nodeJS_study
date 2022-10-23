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

app.use(morgan('dev')); //logger
//static 미들웨어는 정적일 파일을 제공하는 라우터 역할을함.
//아래는 public폴더내의 css, js파일등의 접근을 허용한다.
//public/stylesheets/style.css 은 localhost:3000/stylesheets/style.css를 가르킨다.
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bosyParser.raw());
app.use(bosyParser.text());
//use on parse signed cookie or make a new cookie with signed is 'true'
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
     secret: process.env.COOKIE_SECRET,
     cookie:{
        httpOnly: true, //JS can't use this cookie.
        secure: false // can use http env. 
     },
     //name: 'session-cookie' //default name is 'connect.sid'
     
}));

app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됨.')
    next();
})

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
    
    //res.send('hello express');
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중');
});