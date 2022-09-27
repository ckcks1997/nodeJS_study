const url = require('url');

const {URL} = url;
console.log(URL);

const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000');
console.log("new URL():",myURL);
/*
new URL(): URL {
  href: 'http://www.gilbut.co.kr/book/bookList.aspx?sercate1%20=%20001001000',
  origin: 'http://www.gilbut.co.kr',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'www.gilbut.co.kr',
  hostname: 'www.gilbut.co.kr',
  port: '',
  pathname: '/book/bookList.aspx',
  search: '?sercate1%20=%20001001000',
  searchParams: URLSearchParams { 'sercate1 ' => ' 001001000' },
  hash: ''
}
*/

console.log("searchParams.get:",myURL.searchParams.get('sercate1') );
console.log("searchParams.has:",myURL.searchParams.has('sercate1') );
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1 = 001001000');
console.log("parse:",parsedUrl);
/*
parse: Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.gilbut.co.kr',
  port: null,
  hostname: 'www.gilbut.co.kr',
  hash: null,
  search: '?sercate1%20=%20001001000',
  query: 'sercate1%20=%20001001000',
  pathname: '/book/bookList.aspx',
  path: '/book/bookList.aspx?sercate1%20=%20001001000',
  href: 'http://www.gilbut.co.kr/book/bookList.aspx?sercate1%20=%20001001000'
}
*/