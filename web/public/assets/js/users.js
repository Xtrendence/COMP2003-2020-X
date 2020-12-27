document.addEventListener("DOMContentLoaded", () => {
    let from = 1;
    let to = 50;
    const xhr = new XMLHttpRequest();
    let layer = document.getElementById("patientTable");
    // let actionButtons = document.getElementById("action-buttons");

    function createButtons(){
        console.log("blah");
    }



    function getUsers(from, to) {
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let json = xhr.responseText;
                try {
                    let users = JSON.parse(json);
                    let keys = Object.keys(users["data"]);
                    console.log(users);
                        try {
                            layer.innerHTML = "<tr><th>User ID</th><th>First Name</th><th>Last Name</th><th>Actions</th></tr>";
                            let patient = users["data"];
                            for (let i = 0; i < keys.length; i++){
                                let createDeleteButton;
                                let createEditButton;
                                let createChartButton;
                                let createAnswerButton;
                                let createQuestButton;
                                createDeleteButton = document.createElement("button");
                                createDeleteButton.classList.add("action-button");
                                createDeleteButton.textContent = 'Delete';
                                createEditButton = document.createElement("button");
                                createEditButton.classList.add("action-button");
                                createEditButton.textContent = 'Edit';
                                createChartButton = document.createElement("button");
                                createChartButton.classList.add("action-button");
                                createChartButton.textContent = 'View Chart';
                                createAnswerButton = document.createElement("button");
                                createAnswerButton.classList.add("action-button");
                                createAnswerButton.textContent = 'View Answers';
                                createQuestButton = document.createElement("button");
                                createQuestButton.classList.add("action-button");
                                createQuestButton.textContent = 'Ask Question';

                                let userID = patient[i]["patientID"];
                                let firstName = patient[i]["patient_fName"];
                                let lastName = patient[i]["patient_lName"];
                                let row = document.createElement("tr");
                                let cell1 = row.insertCell(0);
                                let cell2 = row.insertCell(1);
                                let cell3 = row.insertCell(2);
                                let cellAct = row.insertCell(3);
                                row.id = userID;
                                cell1.innerHTML = (userID);
                                cell2.innerHTML = (firstName);
                                cell3.innerHTML = (lastName);
                                cellAct.appendChild(createDeleteButton);
                                cellAct.appendChild(createEditButton);
                                cellAct.appendChild(createChartButton);
                                cellAct.appendChild(createAnswerButton);
                                cellAct.appendChild(createQuestButton);
                                // cellAct.innerHTML = "<button>Delete</button><button>Edit</button><button>View Chart</button><button>View Answers</button><button>Ask Question</button>"

                                layer.appendChild(row);
                                layer.appendChild(cell1);
                                layer.appendChild(cell2);
                                layer.appendChild(cell3);
                                layer.appendChild(cellAct);
                            }
                    } catch {
                        console.error("error123123");
                    }

                } catch {
                    console.error("errorerrorerror");
                }
            }
        });
        xhr.open("GET", "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/users/read-range.php?from=" + from + "&to=" + to + "&key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6", true);
        xhr.send();
    }

    document.getElementById("next-button").addEventListener("click", function () {
        let xhr = new XMLHttpRequest();
        layer.innerHTML = "";
        from = to + 1;
        to = to + 50;
        getUsers(from, to);

        console.log(from, to);
    });

    document.getElementById("prev-button").addEventListener("click", function () {
        let xhr = new XMLHttpRequest();
        layer.innerHTML = "";
        from = to - 99;
        to = to - 50;
        getUsers(from, to);

        console.log(from, to);
    });

    getUsers(from, to);
});