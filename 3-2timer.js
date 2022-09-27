const timeout = setTimeout(() => {
    console.log('1.5sec');
},1500);

const interval = setInterval(()=> {
    console.log('1sec');
},1000);

const timeout2 = setTimeout(() => {
    console.log('실행되지 않습니다');
}, 3000);

setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval);
},2500);

const immediate = setImmediate(()=> {
    console.log('immediate');
})

const immediate2 = setImmediate(()=> {
    console.log('immediate2 not executed');
})

clearImmediate(immediate2);