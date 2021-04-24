document.addEventListener("DOMContentLoaded", () => {
    //verifySession(localStorage.getItem("sessionToken")).then(result => {

        let url = new URL(window.location.href);
        let patID = url.searchParams.get("id");

        let titleCard = document.getElementById("user-chart");
        let startTitle = "Data Analysis - User ";
        let addID = startTitle.concat(patID);
        titleCard.innerText = addID;

    checkTheme();
    //}).catch(error => {
    //    window.location.replace("./login.php");
    //});
});