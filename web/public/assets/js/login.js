document.addEventListener("DOMContentLoaded", () => {
    const Notify = new XNotify("BottomRight");

    let apiKey;
    let apiURL;
    let apiAccess;
    let timeoutLimit = 12500;
    let requestInterval = 750;

    let inputPatientUsername = document.getElementById("patient-username");
    let inputPatientPassword = document.getElementById("patient-password");

    let inputAdminUsername = document.getElementById("admin-username");
    let inputAdminPassword = document.getElementById("admin-password");

    let buttonPatientLogin = document.getElementById("patient-login");
    let buttonAdminLogin = document.getElementById("admin-login");

    buttonPatientLogin.addEventListener("click", async () => {
        if (!buttonPatientLogin.classList.contains("disabled")) {
            if (((empty(inputPatientPassword.value)) && (empty(inputPatientUsername.value)))) {
                let url = new URL(window.location.href);
                let key = url.searchParams.get("key");
                if (empty(key)) {
                    apiKey = empty(inputKey.value) ? window.prompt("Login failed. Do you have an API key already?") : inputKey.value;
                } else {
                    apiKey = key;
                }
            }

            if (((empty(inputPatientPassword.value)) && (!empty(inputPatientUsername.value))) || ((!empty(inputPatientPassword)) && (empty(inputPatientUsername)))) {
                Notify.error({
                    title: "Error",
                    description: "Patient login details must be entered."
                });
            }

            if ((!empty(inputPatientUsername.value)) && (!empty(inputPatientPassword.value))) {
                await loginPatient(inputPatientUsername.value, inputPatientPassword.value).catch(e => {
                    Notify.error({
                        title: "Error",
                        description: e
                    });
                });
                attemptStart();
            }
        }
    });

    buttonAdminLogin.addEventListener("click", async () => {
        if (!buttonAdminLogin.classList.contains("disabled")) {
            if (((empty(inputAdminPassword.value)) && (empty(inputAdminUsername.value)))) {
                let url = new URL(window.location.href);
                let key = url.searchParams.get("key");
                if (empty(key)) {
                    apiKey = empty(inputKey.value) ? window.prompt("Login failed. Do you have an API key already?") : inputKey.value;
                } else {
                    apiKey = key;
                }
            }

            if (((empty(inputAdminPassword.value)) && (!empty(inputAdminUsername.value))) || ((!empty(inputAdminPassword)) && (empty(inputAdminUsername)))) {
                Notify.error({
                    title: "Error",
                    description: "Admin login details must be entered."
                });
            }

            if ((!empty(inputAdminUsername.value)) && (!empty(inputAdminPassword.value))) {
                await loginAdmin(inputAdminUsername.value, inputAdminPassword.value).catch(e => {
                    Notify.error({
                        title: "Error",
                        description: e
                    });
                });
                attemptStart();
            }
        }
    });

    function attemptStart() {
        if (empty(apiKey)) {
            Notify.error({
                title: "Error",
                description: "Cannot log in without an API key."
            });
        } else {
            login();
        }
    }

    async function login() {
        console.log("Logging in...");
        buttonPatientLogin.classList.add("disabled");
        buttonAdminLogin.classList.add("disabled");

        if (apiKey.includes("patient") || apiKey.includes("user")) {
            log("alert", "Using patient token");
            apiAccess = "user";

        } else if (apiKey.includes("admin") || apiKey.includes("researcher")) {
            log("alert", "Using admin token");
            apiAccess = "admin";
        } else {
            log("alert", "Using development token");
            apiAccess = "admin";
        }
    }

    function loginPatient(username, password) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (validJSON(xhr.responseText)) {
                        let response = JSON.parse(xhr.responseText);

                        if (response.valid) {
                            apiKey = response.token;

                            console.log(apiKey);

                            Notify.success({
                                title: "Success",
                                description: "You are now logged in as a patient."
                            });

                            log("success", "Logged In As Patient");

                            resolve();
                        } else {
                            reject("Login failed.");
                        }
                    } else {
                        reject("Invalid JSON.");
                    }
                }
            });

            xhr.open("POST", apiURL + "users/login.php", true);
            xhr.send(JSON.stringify({ patient_username: username, patient_password: password, fcmToken: "-" }));
        });
    }

    function loginAdmin(username, password) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (validJSON(xhr.responseText)) {
                        let response = JSON.parse(xhr.responseText);

                        if (response.valid) {
                            apiKey = response.token;

                            console.log(apiKey);

                            Notify.success({
                                title: "Success",
                                description: "You are now logged in as an administrator."
                            });

                            log("success", "Logged In As Admin");

                            resolve();
                        } else {
                            reject("Login failed.");
                        }
                    } else {
                        reject("Invalid JSON.");
                    }
                }
            });

            xhr.open("POST", apiURL + "admins/login.php", true);
            xhr.send(JSON.stringify({ researcher_username: username, researcher_password: password, fcmToken: "-" }));
        });
    }

    function validJSON(json) {
        try {
            let object = JSON.parse(json);
            if (object && typeof object === "object") {
                return true;
            }
        }
        catch (e) { }
        return false;
        }

    function log(className, text) {
        let element = document.createElement("span");
        element.textContent = text;
        divOutput.appendChild(element);
        element.classList.add(className);
    }

    function empty(value) {
        if (typeof value === "object" && value !== null && Object.keys(value.length === 0)) {
            return true;
        }
        if (value === null || typeof value === "undefined" || value.toString().trim() === "") {
            return true;
        }
        return false;
    }

 });