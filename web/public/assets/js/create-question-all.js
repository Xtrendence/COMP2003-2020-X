document.addEventListener("DOMContentLoaded", () => {
    verifySession(localStorage.getItem("sessionToken")).then(result => {
        

    }).catch(error => {
        window.location.replace("./login.php");
    });
});