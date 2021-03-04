

let url = new URL(window.location.href);
let patID = url.searchParams.get("id");

let titleCard = document.getElementById("user-question");
let title = "Ask a Question - User ";
let addID = title.concat(patID);
titleCard.innerText = addID;