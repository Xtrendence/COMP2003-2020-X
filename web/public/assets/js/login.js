document.addEventListener("DOMContentLoaded", () => {
    const Notify = new XNotify("BottomRight");

    let apiKey;
    let apiURL = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/";
    let apiAccess;

    let inputAdminUsername = document.getElementById("admin-username");
    let inputAdminPassword = document.getElementById("admin-password");

    let buttonAdminLogin = document.getElementById("admin-login");

    buttonAdminLogin.addEventListener("click", async () => {
        if (!buttonAdminLogin.classList.contains("disabled")) {
            if (((empty(inputAdminPassword.value)) && (empty(inputAdminUsername.value)))) {
                let url = new URL(window.location.href);
                let key = url.searchParams.get("key");
                if (empty(key)) {
                    apiKey = empty(inputKey.value) ? window.prompt("Empty API key...") : inputKey.value;
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
        buttonAdminLogin.classList.add("disabled");

        if (apiKey.includes("admin") || apiKey.includes("researcher")) {
            log("alert", "Using admin token");
            apiAccess = "admin";
        } else {
            log("alert", "Using development token");
            apiAccess = "admin";
        }
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