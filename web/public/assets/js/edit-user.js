document.addEventListener("DOMContentLoaded", () => {
    let url = new URL(window.location.href);
    let qID = url.searchParams.get("id");
    let titleCard = document.getElementById("user-id");
    let title = "Edit User - User ";
    let addID = title.concat(qID);
    titleCard.innerText = addID;

});