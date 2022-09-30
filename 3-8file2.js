const fs = require('fs').promises;

fs.readFile('./readme.txt')
.then((data)=>{
    console.log(data);
    console.log(data.toString());
})
.catch(err => {
    console.error(err);
});

fs.writeFile('./writeme.txt',"writed")
.then(() => {
    return fs.readFile('./writeme.txt')
})
.then(data =>{
    console.log(data.toString());
})
.catch(err => {
    console.error(err);
})

