document.addEventListener("DOMContentLoaded", () => {
    const xhr = new XMLHttpRequest();

    let fNameInput = document.getElementById("inputForename");
    let sNameInput = document.getElementById("inputSurname");

    let url = new URL(window.location.href);
    let userID = url.searchParams.get("id");
    let titleCard = document.getElementById("user-id");
    let title = "Edit User - User ";
    let addID = title.concat(userID);
    titleCard.innerText = addID;

    let sessionToken = localStorage.getItem("sessionToken");

    function getUser(){
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let json = xhr.responseText;
                let users = JSON.parse(json);
                let keys = Object.keys(users);
                try {
                    let patient = users;
                    for (let i = 0; i < keys.length; i++) {
                        let fName = patient["patient_fName"];
                        let sName = patient["patient_lName"];

                        fNameInput.setAttribute("value", fName);
                        sNameInput.setAttribute("value", sName);
                    }
                } catch {
                    console.error("error");
                }
            }
        });
        xhr.open("GET", "./api/users/read.php?id=" + userID + "&key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6" , true);
        xhr.send();
    }

    getUser();
});