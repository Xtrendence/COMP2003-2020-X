document.addEventListener("DOMContentLoaded", () => {
    let sessionToken = localStorage.getItem("sessionToken");

    verifySession(sessionToken).then(result => {
        let researcherInput = document.getElementById("researcher-id");
        let nhsInput = document.getElementById("patient-nhs-ref");
        let usernameInput = document.getElementById("patient-username");
        let passwordInput = document.getElementById("patient-password");
        let fNameInput = document.getElementById("patient-first-name");
        let lNameInput = document.getElementById("patient-last-name");
        let dobInput = document.getElementById("patient-dob");
        let ad1Input = document.getElementById("patient-address-line-1");
        let ad2Input = document.getElementById("patient-address-line-2");
        let postInput = document.getElementById("patient-postcode");
        let telInput = document.getElementById("patient-telephone");
        let mobInput = document.getElementById("patient-mobile");
        let emailInput = document.getElementById("patient-email");
        let commInput = document.getElementById("patient-comment");

        let editBtn = document.getElementById("submit-edit")

        let url = new URL(window.location.href);
        let userID = url.searchParams.get("id");
        let titleCard = document.getElementById("user-id");
        let title = "Edit User - User ";
        let addID = title.concat(userID);
        titleCard.innerText = addID;

        let changes;

        function getUser() {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    let json = xhr.responseText;
                    let users = JSON.parse(json);
                    let keys = Object.keys(users);
                    try {
                        let patient = users;
                        for (let i = 0; i < keys.length; i++) {
                            let res = result.researcherID;
                            let nhs = patient["patient_nhsRef"];
                            let username = patient["patient_username"];
                            let password = patient["patient_password"];
                            let first = patient["patient_fName"];
                            let last = patient["patient_lName"];
                            let dob = patient["patient_dob"];
                            let ad1 = patient["patient_addressI"];
                            let ad2 = patient["patient_addressII"];
                            let pCode = patient["patient_postcode"];
                            let tel = patient["patient_tel"];
                            let mobile = patient["patient_mobile"];
                            let email = patient["patient_email"];
                            let comm = patient["patient_comment"];

                            researcherInput.setAttribute("value", res);
                            nhsInput.setAttribute("value", nhs);
                            usernameInput.setAttribute("value", username);
                            passwordInput.setAttribute("value", password);
                            fNameInput.setAttribute("value", first);
                            lNameInput.setAttribute("value", last);
                            dobInput.setAttribute("value", dob);
                            ad1Input.setAttribute("value", ad1);
                            ad2Input.setAttribute("value", ad2);
                            postInput.setAttribute("value", pCode);
                            telInput.setAttribute("value", tel);
                            mobInput.setAttribute("value", mobile);
                            emailInput.setAttribute("value", email);
                            commInput.setAttribute("value", comm);
                        }
                    } catch {
                        console.error("error");
                    }
                }
            });
            xhr.open("GET", "./api/users/read.php?id=" + userID + "&key=" + result.token, true);
            xhr.send();
        }

        editBtn.addEventListener("click", function() {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function() {
                if (xhr.readystatechange === XMLHttpRequest.DONE) {
                    console.log("123");
                    let json = xhr.responseText;
                    let users = JSON.parse(json);
                    let keys = Object.keys(users);
                    try {
                        for (let i = 0; i < keys.length; i++) {
                            changes = {
                                researcherID: result.researcherID,
                                patient_nhsRef: result.patient_nhsRef,
                                patient_username: usernameInput.value,
                                patient_password: passwordInput.value,
                                patient_fName: fNameInput.value,
                                patient_lName: lNameInput.value,
                                patient_addressI: ad1Input.value,
                                patient_addressII: ad2Input.value,
                                patient_postcode: postInput.value,
                                patient_tel: telInput.value,
                                patient_mobile: mobInput.value,
                                patient_email: emailInput.value,
                                patient_comment: commInput.value
                            };
                        }
                    } catch {
                        console.error("error");
                    }
                }
                else{
                }
            });
            xhr.open("PUT", "./api/users/update.php?key=" + result.token, true);
            xhr.send(JSON.stringify(changes));
            getUser();
        });

        getUser();

    }).catch(error => {
        window.location.replace("./login.php");
    });
});