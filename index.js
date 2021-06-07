const formEl = document.getElementById("formEl");
const formTextAreaEl = document.getElementById("formTextArea");
const userPostsBlock = document.getElementById("userPostsBlock");

let userPosts = [];
const msgResult = {
    errorMsg: "",
    successfulMsg: "",
}

const setNewPost = (post) => {
    const userPost = document.createElement('div');
    userPost.className = 'user-post-el';
    const image = post.image;
    if (image) {
        userPost.innerHTML += `<img class="user-post-el-img" src=${image} alt="post image">`;
    }
    for (let key in post) {
        if (key !== "image") {
            userPost.innerHTML += `
                <div class="user-post-el-row">
                    <span class="user-post-el-label">${key}:</span> 
                    ${post[key]}
                </div>
            `;
        }
    }
    userPostsBlock.appendChild(userPost);
}

(async function () {
    const response = await fetch('http://localhost:8080/userPosts');
    const responseJSON = await response.json();
    userPosts = responseJSON.userPosts;
    if (!userPosts.length) {
        userPosts.innerHTML = `<div>No posts...</div>`;
    } else {
        userPosts.forEach(post => {
            setNewPost(post);
        })
    }
}())

formEl.addEventListener("submit", async event => {
    event.preventDefault();

    msgResult.errorMsg = "";
    msgResult.successfulMsg = "";

    const formData = new FormData(formEl);
    formData.append("comment", formTextAreaEl.value);
    const reqBody = {};

    for (let key of formData.keys()) {
        const formValue = formData.get(key);
        if (!(formValue instanceof File)) {
            reqBody[key] = formValue;
        }
    }
    for (let key in reqBody) {
        formData.delete(key);
    }

    const response = await fetch('http://localhost:8080/userPost', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(reqBody),
    })
    const responseJSON = await response.json();

    if (responseJSON.errorMsg) {
        msgResult.errorMsg = responseJSON.errorMsg;
        return setMsgContentBlock();
    }

    msgResult.successfulMsg = responseJSON.successfulMsg;

    const responseImage = await fetch('http://localhost:8080/userPostImage', {
        method: "POST",
        body: formData,
    })
    const responseImageJSON = await responseImage.json();

    if (responseImageJSON.errorMsg) {
        msgResult.successfulMsg = "";
        msgResult.errorMsg = responseImageJSON.errorMsg;
        return setMsgContentBlock();
    }
    setNewPost({...reqBody, image: responseImageJSON.image});
    msgResult.successfulMsg += "\n" + responseImageJSON.successfulMsg;
    return setMsgContentBlock();
})

const setMsgContentBlock = () => {
    const resultMsgEl = document.getElementById("resultMsgEl");
    console.log("msgResult: ", msgResult);
    if (msgResult.errorMsg.length) {
        resultMsgEl.className = 'error-msg-block';
        resultMsgEl.textContent = msgResult.errorMsg;
        resultMsgEl.style.display = 'block';
    } else if (msgResult.successfulMsg.length) {
        resultMsgEl.className = 'successful-msg-block';
        resultMsgEl.textContent = msgResult.successfulMsg;
        resultMsgEl.style.display = 'block';
    }
    setTimeout(() => {
        resultMsgEl.style.display = 'none';
    }, 5000);
}