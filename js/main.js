const elUserList = document.querySelector(".js-userList");
const elPostList = document.querySelector(".js-postList");
const elCommentList = document.querySelector(".js-commentList");
const elTemplate = document.querySelector(".js-template").content;
const elPostTemplate = document.querySelector(".js-postTemplate").content;
const elCommentTemplate = document.querySelector(".js-commentTemplate").content;

const usersFragment = document.createDocumentFragment();
const renderUsers = (array, node) => {
  node.innerHtml = "";

  array.forEach((e) => {
    const newTemplate = elTemplate.cloneNode(true);

    newTemplate.querySelector(".js-item").dataset.postId = e.id;

    newTemplate.querySelector(".js-id").textContent = e.id;
    newTemplate.querySelector(".js-name").textContent = e.name;
    newTemplate.querySelector(".js-username").textContent = e.username;
    newTemplate.querySelector(".js-userStreet").textContent = e.address.street;
    newTemplate.querySelector(".js-userSuite").textContent = e.address.suite;
    newTemplate.querySelector(".js-userCity").textContent = e.address.city;
    newTemplate.querySelector(".js-userZipcode").textContent = e.address.zipcode;
    newTemplate.querySelector(".js-userLink").href = `https://www.google.com/maps/place/${e.address.geo.lat},${e.address.geo.lng}`;
    newTemplate.querySelector(".js-userPhone").href = `tel:${e.phone}`;
    newTemplate.querySelector(".js-userEmail").href = `mailto:${e.email}`;
    newTemplate.querySelector(".js-userWebsite").href = `https:${e.website}`;
    newTemplate.querySelector(".js-userComName").textContent = e.company.name;
    newTemplate.querySelector(".js-userComPhrase").textContent = e.company.catchPhrase;
    newTemplate.querySelector(".js-userComBs").textContent = e.company.bs;

    usersFragment.appendChild(newTemplate);
  });
  node.appendChild(usersFragment);
};

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  renderUsers(data, elUserList);
}

getUsers();

const renderPosts = (array, node) => {
  array.forEach(e => {
    const newPostTemplate = elPostTemplate.cloneNode(true);

    newPostTemplate.querySelector(".js-postItem").dataset.commentId = e.id;

    newPostTemplate.querySelector(".js-postTitle").textContent = e.title;
    newPostTemplate.querySelector(".js-postBody").textContent = e.body;

    node.appendChild(newPostTemplate);
  })
}

async function getPosts() {
  const postResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
  const postData = await postResponse.json();
  
  elUserList.addEventListener("click", function(evt) {
    if (evt.target.matches(".js-item")) {
      elPostList.innerHTML = ""
      const findedPost = evt.target.dataset.postId;

      const filteredPost = postData.filter((e) => {
        return e.userId == findedPost;
      }) 
      renderPosts(filteredPost, elPostList);
    }
  })
} 

getPosts();

const renderComments = (array, node) => {
  node.innerHTML = "";
  
  array.forEach((e) => {
    const newCommentTemplate = elCommentTemplate.cloneNode(true);

    newCommentTemplate.querySelector(".js-commentName").textContent = e.name;
    newCommentTemplate.querySelector(".js-commentEmail").href = `mailto:${e.email}`;
    newCommentTemplate.querySelector(".js-commentBody").textContent = e.body;

    node.appendChild(newCommentTemplate);
  })
}
 
async function getComments() {
  const commentResponse = await fetch("https://jsonplaceholder.typicode.com/comments");
  const commentData = await commentResponse.json();

  elPostList.addEventListener("click", function(evt){
    if (evt.target.matches(".js-postItem")) {
      elCommentList.innerHTML = "";
      const findedComment = evt.target.dataset.commentId;

      const filteredComment = commentData.filter((e) => {
        return e.postId == findedComment;
      })
      renderComments(filteredComment, elCommentList);
    }
  })
}

getComments();
