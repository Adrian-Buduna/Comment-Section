//define const to store data
const comments = [];
//check const
console.log(comments);
//get date and return it to comment handler
function commentDate() {
  const newDate = new Date();

  let year;
  year = newDate.getFullYear();

  let month;
  month = newDate.getMonth();

  let day;
  day = newDate.getDate();

  let hour;
  hour = newDate.getHours();

  let minutes;
  minutes = newDate.getMinutes();

  let seconds;
  seconds = newDate.getSeconds();

  month < 10 ? (month = "0" + month) : (month = month);
  day < 10 ? (day = "0" + day) : (day = day);
  hour < 10 ? (hour = "0" + hour) : (hour = hour);
  minutes < 10 ? (minutes = "0" + minutes) : (minutes = minutes);
  seconds < 10 ? (seconds = "0" + seconds) : (seconds = seconds);

  return ` on: ${year}/${month}/${day}  at: ${hour}:${minutes}:${seconds}`;
  // i don't know what comments to put here...
}
//add like to each handler -- still in progress
function addLike(likeBtn, id, like) {
  likeBtn.onclick = (e) => {
    const comment = comments.find((comment) => comment.id === id);
    comment.like = like + 1;
  }//on id of object edit likes
}
//add comments to constant handler
function addComment() {
  const addCommentButtonEl = document.getElementById("btnId");
  addCommentButtonEl.onclick = (e) => {
    const inputEl = document.getElementById("inpId");
    const textArea = document.getElementById("textareaId");

    if (!inputEl.value || !textArea.value) {
      return;
    } //if name or text is empty short circuit
    const newComment = {
      id: Math.random().toString(),
      nameComm: inputEl.value,
      text: textArea.value,
      date: commentDate(),
      like: 0,
    };
    comments.push(newComment);
    inputEl.value = "";
    textArea.value = "";
    render();
  }; //create and push obj in const that stores data
}
//display comments handler
function displayComment({ nameComm, text, date, id, like }) {
  const commentListEl = document.getElementById("commentSectionId");

  const commentFullEl = document.createElement("div");
  commentFullEl.className = "commentfull-cls";

  const commentNameEl = document.createElement("div");
  commentNameEl.className = "commentName-cls";
  commentNameEl.innerText = nameComm;

  const commentPostDate = document.createElement("p");
  commentPostDate.className = "commentDate-cls";
  commentPostDate.textContent = date;

  const likeBtn = document.createElement("button");
  likeBtn.className = "fa fa-thumbs-up likeBtn-cls";

  const likeNumber = document.createElement("p");
  likeNumber.className = "likeNumber-cls";
  addLike(likeBtn, id, like);
  likeNumber.innerHTML = like;

  const commentContentEl = document.createElement("div");
  commentContentEl.className = "commentContent-cls";
  commentContentEl.innerText = text;

  commentFullEl.appendChild(commentPostDate);
  commentFullEl.appendChild(commentNameEl);
  commentFullEl.appendChild(likeBtn); //
  commentFullEl.appendChild(likeNumber);
  commentFullEl.appendChild(commentContentEl);

  commentListEl.appendChild(commentFullEl);
}
//sort comments on likes number, iterate on const and use displayComment handler
function render() {
  const commentListEl = document.getElementById("commentSectionId");
  commentListEl.innerHTML = ""; //set list to none in order to call it back when updates are made in to constant that stores data
  comments.sort((a, b) => b.like - a.like); //sort on likes numbers
  comments.forEach((comment) => displayComment(comment)); //for each object display comment
}
//call handlers
addComment();
render();
