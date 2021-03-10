document.addEventListener("DOMContentLoaded", () => {

/* Variables for getting api URI data */

    let url = new URL(window.location.href);
    let patID = url.searchParams.get("id");

    let titleCard = document.getElementById("user-title");
    let title = "User Profile - User ";
    let addID = title.concat(patID);
    titleCard.innerText = addID;

/* Variables used for "content" div class that wraps each data field small card: XML request initiated for HTML content  */
    let content = document.getElementById("content")
    let xhr = new XMLHttpRequest();

/* Variables used for small card api field values that transform the ID of each span into the field characters */
    let refCard = document.getElementById("NHS-RN");
    let usernameCard = document.getElementById("username");
    let fnCard = document.getElementById("firstname");
    let lnCard = document.getElementById("lastname");
    let dobCard = document.getElementById("DOB");
    let aline1Card = document.getElementById("AL1");
    let aline2Card = document.getElementById("AL2");
    let postcodeCard = document.getElementById("postcode");
    let tnCard = document.getElementById("TN");
    let mnCard = document.getElementById("MN");
    let emailCard = document.getElementById("email");
    let commentsCard = document.getElementById("comments");


    /* Event listener for xhr containing if statement for try catch for retrieving data  */
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let json = xhr.responseText;
            let users = JSON.parse(json);
            let keys = Object.keys(users);

            try {
                let patient = users;
                for (let i = 0; i < keys.length; i++){

                    /* Variables used for "read" api endpoint field values */
                    let ref = patient["patient_nhsRef"];
                    let userName = patient["patient_username"];
                    let firstName = patient["patient_fName"];
                    let lastName = patient["patient_lName"];
                    let dateBirth = patient["patient_dob"];
                    let addressLine1 = patient["patient_addressI"];
                    let addressLine2 = patient["patient_addressII"];
                    let postCode = patient["patient_postcode"];
                    let telephoneNumber = patient["patient_tel"];
                    let mobileNumber = patient["patient_mobile"];
                    let emailAddress = patient["patient_email"];
                    let comments = patient["patient_comment"];

                    /* Small card field variables being assigned to their corresponding api field variable values  */
                    refCard.innerText = ref;
                    usernameCard.innerText = userName;
                    fnCard.innerText = firstName
                    lnCard.innerText = lastName;
                    dobCard.innerText = dateBirth;
                    aline1Card.innerText = addressLine1;
                    aline2Card.innerText = addressLine2;
                    postcodeCard.innerText = postCode;
                    tnCard.innerText = telephoneNumber;
                    mnCard.innerText = mobileNumber;
                    emailCard.innerText = emailAddress;
                    commentsCard.innerText = comments;




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