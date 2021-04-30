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
    let refCard = document.getElementById("nhs-rn");
    let usernameCard = document.getElementById("username");
    let fnCard = document.getElementById("firstname");
    let lnCard = document.getElementById("lastname");
    let dobCard = document.getElementById("dob");
    let aline1Card = document.getElementById("al-1");
    let aline2Card = document.getElementById("al-2");
    let postcodeCard = document.getElementById("post-code");
    let tnCard = document.getElementById("tn");
    let mnCard = document.getElementById("mn");
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
                let userID = patient["patientID"];
                for (let i = 0; i < keys.length; i++){

                    /* Variables used for "read" api endpoint field values */
                    let userID = patient["patientID"];
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


                    console.log("hello");


                }

                createButton(chartsButton, userID);
            } catch {
                console.error("error");
            }

        }
    });
    /* XHR element: XML HTTP GET REQUEST: followed by URI link for "read" api end point */
    xhr.open("GET", "./api/users/read.php?key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6&id=" + patID, true);
    xhr.send();

    let chartsButton;
    let buttonDiv = document.getElementById("buttons");

    /* createButton function used to Generate charts button and direct web page to the appropriate charts page for currently viewed user profile */
    function createButton(chartsButton, userID){

        let chartsAnchor = document.createElement("a");

        chartsButton = document.createElement("button");
        chartsButton.classList.add("page-button");
        chartsButton.id = "charts-button";
        chartsButton.textContent = 'View User Charts';
        chartsAnchor.href = "./charts.php?id=" + userID + "";

        chartsAnchor.appendChild(chartsButton);
        buttonDiv.appendChild(chartsAnchor);
    }
    
    /**
     * @desc on DOM loaded, it checks to see if localStorage has the key:'theme', and if it does is it's value:'dark'.
     *      when that is true, it sets the body with an attribute to turn the theme dark.
     */
    if(localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme', 'dark');
    }

});