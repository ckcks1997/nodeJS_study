const url = require('url');
const querystring = require('querystring');

const parsedurl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000');

let query = querystring.parse(parsedurl.query);
console.log(query);
console.log(querystring.stringify(query));

//newer version
query = new URLSearchParams(parsedurl.query);
console.log(query.get('sercate1')); 