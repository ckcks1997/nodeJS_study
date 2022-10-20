const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', express.static(path.join(__dirname, 'public')));

//wiew engine

//app.set('view engine', 'pug')
//app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
nunjucks.configure('views', {
    express: app,
    watch: true,
});


//
app.get('/body', (req, res) =>{
    res.render('body', {title:'Express'})
})
app.get('/', (req, res) =>{
    res.render('index', {title:'Express'})
})

//error 처리
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터 없음`);
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) =>{
    res.locals.message = err.message;
    res.locals.error = err;
    res.status(500);
    res.render('error')
})

app.listen('3000', ()=>{
    console.log('3000','port..')
} )