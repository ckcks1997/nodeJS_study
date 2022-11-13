const mongoose = require('mongoose');

const connect = () =>{
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug', true);
    }

    mongoose.connect('mongodb://name:pw@localhost:27017/admin',{
        dbName: '1',
        useNewUrlParser: true,
        //useCreateIndex: true,
    }, (error) =>{
        if(error){
            console.log('db연결에러', error);
        } else{
            console.log('db연결 성공')
        }
    })

}

mongoose.connection.on('error', (error)=>{
        console.error('db연결에러', error);
});

mongoose.connection.on('disconnected', ()=>{
    console.error('db연결 해제됨');
});

module.exports = connect;