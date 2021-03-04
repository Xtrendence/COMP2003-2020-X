document.addEventListener("DOMContentLoaded", () => {

    let url = new URL(window.location.href);
    let patID = url.searchParams.get("id");

    let titleCard = document.getElementById("user-title");
    let title = "User Profile - ";
    let addID = title.concat(patID);
    titleCard.innerText = addID;




});