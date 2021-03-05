document.addEventListener("DOMContentLoaded", () => {

/* variables for getting api URL data */

    let url = new URL(window.location.href);
    let patID = url.searchParams.get("id");

    let titleCard = document.getElementById("user-title");
    let title = "User Profile - User ";
    let addID = title.concat(patID);
    titleCard.innerText = addID;

    let content = document.getElementById("content")
    let xhr = new XMLHttpRequest();

    let refCard = document.getElementById("NHS-RN");
    let usernameCard = document.getElementById("username");
    let fnCard = document.getElementById("firstname");


    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let json = xhr.responseText;
            let users = JSON.parse(json);
            let keys = Object.keys(users);

            try {
                let patient = users;
                for (let i = 0; i < keys.length; i++){
                    let ref = patient["patient_nhsRef"];

                    let userName = patient["patient_username"];

                    let firstName = patient["patient_fName"];
                    let lastName = patient["patient_lName"];

                    refCard.innerText = ref;
                    usernameCard.innerText = userName;
                    fnCard.innerText = firstName


                }
            } catch {
                console.error("error");
            }

        }
    });
    /* XHR element: XML HTTP GET REQUEST: followed by URI link for "read" api end point */
    xhr.open("GET", "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/users/read.php?key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6&id=" + patID, true);
    xhr.send();


});