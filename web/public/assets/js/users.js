document.addEventListener("DOMContentLoaded", () => {
    let from = 1;
    let to = 50;
    const xhr = new XMLHttpRequest();
    let header = document.getElementById("table-header");
    let layer = document.getElementById("table-body");
    let deleteButton;
    let editButton;
    let profileButton;
    let answerButton;
    let questButton;




    function getUsers(from, to, userID, firstName, lastName) {
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let json = xhr.responseText;
                try {
                    let users = JSON.parse(json);
                    let keys = Object.keys(users["data"]);
                    console.log(users);
                        try {
                            // layer.innerHTML = "<tr><th>User ID</th><th>First Name</th><th>Last Name</th><th>Actions</th></tr>";
                            let patient = users["data"];
                            for (let i = 0; i < keys.length; i++){
                                console.log("123");
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
                                layer.appendChild(row);
                                layer.appendChild(cell1);
                                layer.appendChild(cell2);
                                layer.appendChild(cell3);

                                createButtons(deleteButton, editButton, profileButton, answerButton, questButton, userID, cellAct, row);
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
    });

    document.getElementById("prev-button").addEventListener("click", function () {
        let xhr = new XMLHttpRequest();
        layer.innerHTML = "";
        from = to - 99;
        to = to - 50;
        getUsers(from, to);
    });
    function createButtons(deleteButton, editButton, profileButton, answerButton, questButton, userID, cellAct, row){
        let editAnchor = document.createElement("a");
        let profileAnchor = document.createElement("a");
        let answerAnchor = document.createElement("a");
        let questionAnchor = document.createElement("a");

        deleteButton = document.createElement("button");
        deleteButton.classList.add("action-button");
        deleteButton.id = "deleteButton";
        deleteButton.textContent = 'Delete';

        editButton = document.createElement("button");
        editButton.classList.add("action-button");
        editButton.id = "editButton";
        editButton.textContent = 'Edit';
        editAnchor.href = "./edit-user.php?id=" + userID + "";
        editAnchor.appendChild(editButton);

        profileButton = document.createElement("button");
        profileButton.classList.add("action-button");
        profileButton.id = "profileButton";
        profileButton.textContent = 'View Profile';
        profileAnchor.href = "./charts.php?id=" + userID + "";
        profileAnchor.appendChild(profileButton);

        answerButton = document.createElement("button");
        answerButton.classList.add("action-button");
        answerButton.id = "answerButton";
        answerButton.textContent = 'View Answers';
        answerAnchor.href = "./answers.php?id=" + userID + "";
        answerAnchor.appendChild(answerButton);

        questButton = document.createElement("button");
        questButton.classList.add("action-button");
        questButton.textContent = 'Ask Question';
        questButton.id = "questButton";
        questionAnchor.href = "./create-question.php?id=" + userID + "";
        questionAnchor.appendChild(questButton);

        cellAct.appendChild(deleteButton);
        cellAct.appendChild(editAnchor);
        cellAct.appendChild(profileAnchor);
        cellAct.appendChild(answerAnchor);
        cellAct.appendChild(questionAnchor);
        layer.appendChild(cellAct);
        // questButton = "<a href=\"./create-question?id=\" + userID + \"></a>";
    }

    getUsers(from, to);
});