const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK || constants.W_OK||constants.R_OK)
.then(() => {
    return Promise.reject('이미 폴더 있음'); //fs를 리턴하지 않아 종료됨.
})
.catch((err) => {
    if(err.code ==='ENOENT'){
        console.log('폴더 없음');
        return fs.mkdir('./folder');
    }
    return Promise.reject(err);
})
.then(() => {
    console.log('폴더 만들기 성공');
    return fs.open('./folder/file.js', 'w');
})
.then((fd) => {
    console.log('빈폴더 만들기 성공', fd);
    return fs.rename('./folder/file.js', './folder/newfile.js');
})
.then(() => {
    console.log('이름변경');
})
.catch(err=>{
    console.error(err);
})

//폴더확인 및 삭제 메서드
fs.readdir('./folder')
    .then(dir => {
        console.log('폴더내용 확인', dir);
        return fs.unlink('./folder/newfile.js');
    })
    .then(() => {
        console.log('파일삭제');
        return fs.rmdir('./folder');
    })
    .then(() => {
        console.log('삭제성공')
    })
    .catch(e => {
        console.error(e);
    })

    //파일복사 최신방법
fs.copyFile('readme.txt', 'writeme2.txt')
    .then(() => {
        console.log('copied')
    })
    .catch((err) => {
        console.error(err);
    })