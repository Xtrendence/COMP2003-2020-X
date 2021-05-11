document.addEventListener("DOMContentLoaded", () => {
    let sessionToken = localStorage.getItem("sessionToken");

    verifySession(sessionToken).then(result => {
		checkTheme();
    }).catch(error => {
        window.location.replace("./login.php");
    });
});

