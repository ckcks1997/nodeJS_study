const express = require('express')
const path = require('path')
const morgan = require('morgan')
const nunjucks = require('nunjucks')

const {requelize, sequelize} = require('./models');

const app = express();
app.set('port', 3001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
sequelize.sync({force: false})
    .then(() => {
        console.log("db connected")
    })
    .catch((err) =>{
        console.log(err)
    });

app.use(morgan(('dev')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) =>{
    res.locals.message = err.message;
    res.locals.error = err;
    res.status(500);
    res.render('error');
});

app.listen(app.get('port'), () =>{
    console.log(app.get('port')+' waiting..')
})