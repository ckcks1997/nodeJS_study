const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
//use if you need raw/text data parser
const bosyParser = require('body-parser');
const fs = require('fs');
try {
    fs.readdirSync('uploads')
} catch (error) {
    console.error('can\'t find /upload Folder, creating folder..');
    fs.mkdirSync('uploads');
}
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        //in first parameter, put the error if it has.
        //in second parameter, put file path or filename.
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            //adds date on filename to prevents filename duplication.
            done(null, path.basename(file.originalname, ext)+ Date.now()+ext);
        },
    }),
    limits: {fileSize: 5*1024*1024} //5MB
})
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
// 
// app.post('/upload', upload.single('image'), (req, res)=>{
//     console.log(req.file, req.body);
//     res.send('ok');
// })

//name과 파라미터 이름이 일치해야 함
////여러 파일을 업로드 하는경우, upload.array를 사용
app.post('/upload', upload.array('many'), (req, res)=>{
    console.log(req.file, req.body);
    res.send('ok');
});

app.post('/upload2', upload.fields([{name: 'image1'}, {name: 'image2'}]),
 (req, res)=>{
    console.log(req.file, req.body);
    res.send('ok');
})

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중');
});