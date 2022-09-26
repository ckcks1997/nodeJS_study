console.time("시간측정");

const obj = {
    outside: {
        inside: {
            key: "value"
        }
    }
}

console.error("err");
//객체배열을 테이블로 출력
console.table([{name:"hello", birth: 1900},{name:"hello2", birth: 1922}]);
//객체 정보
console.dir(obj, {color: true, depth: 2})

console.timeEnd("시간측정") ;

/*
err
┌─────────┬──────────┬───────┐
├─────────┼──────────┼───────┤
│    0    │ 'hello'  │ 1900  │
│    1    │ 'hello2' │ 1922  │
└─────────┴──────────┴───────┘
{ outside: { inside: { key: 'value' } } }
시간측정: 8.6ms
*/