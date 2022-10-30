
//사용자 이름 눌렀을 떄
document.querySelectorAll('#user-list tr').forEach((el) =>{
    el.addEventListener('click', function(){
        const id = el.querySelector('td').textContent;
        getComment(id);
    })
});

//사용자 로딩
async function getUser(){
    try {
        const res = await axios.get('/users');
        const users = res.data;
        console.log(users);
        const tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML  = '';
        users.map(function(user) {
            const row = document.createElement('tr');
            row.addEventListener('click', () =>{
                getComment(user.id);
            });

            //로우 셀 추가
            let td = document.createElement('td');
            td.textContent = user.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.age;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.married ? '기혼' : '미혼';
            row.appendChild(td);

        })

    } catch (error) {
        console.error(err);
    }
}

async function getComment(id){
    try {
        const res = await axios.get(`/users/${id}/comments`);
        const comments = res.data;
        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML = '';
        comments.map(function (comment){
            //로우 셀 추가
            const row = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = comment.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = comment.User.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = comment.comment;
            row.appendChild(td);
            const edit = document.createElement('button');
            edit.textContent = '수정';

            edit.addEventListener('click', async () => { //수정 클릭시
                const newComment = prompt('바꿀 내용:');
                if (!newComment){
                    return alert('내용을 입력하세요');
                }
                try {
                    await axios.patch(`/comments/${comment.id}`, {comment: newComment});
                    getComment(id);
                } catch (error) {
                    console.error(err);
                }
            });

            const remove = document.createElement('button') ;
            remove.textContent = '삭제';
            remove.addEventListener('click', async() => {
                try {
                    await axios.delete(`/comments/${comment.id}`);
                    getComment(id);
                } catch (error) {
                    console.error(err);
                }
            });
            //버튼추가
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);
            td = document.createElement('td');
            td.appendChild(remove);
            row.appendChild(td);
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
    }
}

//사용자 등록시
document.getElementById('user-form')
        .addEventListener('submit', async (e) =>{

    e.preventDefault();
    const name = e.target.username.value;
    const age = e.target.age.value;
    const married = e.target.married.checked;
    if(!name){
        return alert('이름 입력:');
    }
    if(!age){
        return alert('나이 입력:');
    }
    try {
        await axios.post('/users', {name, age, married});
        getUser();
    } catch (error) {
        console.error(error);
    }
    e.target.username.value = '';
    e.target.age.value = '';
    e.target.married.checked = false;
});

//댓글등록시
document.getElementById('comment-form').addEventListener('submit', async (e) =>{
    e.preventDefault();
    const id = e.target.userid.value;
    const comment = e.target.comment.value;
    if(!id){
        return alert('id 입력하세요');
    }
    if(!comment){
        return alert('댓글내용 입력하세요');
    }
    try {
        await axios.post('/comments', {id, comment});
        getComment(id);
    } catch (error) {
        console.error(error);
    }
    e.target.userid.value = '';
    e.target.comment.value = '';
    
})