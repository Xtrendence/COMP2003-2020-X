document.addEventListener("DOMContentLoaded", () => {
    let from = 1;
    let to = 50;
    let layer = document.getElementById("table-body");
    let deleteButton;
    let editButton;
    let profileButton;
    let chartButton;
    let answerButton;
    let questButton;
    let nextButton = document.getElementById("next-button");
    let prevButton = document.getElementById("prev-button");
    let searchButton = document.getElementById("search-button");
    nextButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">\n' +
        '  <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>\n' +
        '</svg>';
    prevButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">\n' +
        '  <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>\n' +
        '</svg>';

    let sessionToken = localStorage.getItem("sessionToken");

    let idInput = document.getElementById("id-search");

    function getUsers(from, to) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let json = xhr.responseText;
                let users = JSON.parse(json);
                let keys = Object.keys(users["data"]);
                try {
                    layer.innerHTML = "";
                    let patient = users["data"];
                    for (let i = 0; i < keys.length; i++){
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

                        createButtons(deleteButton, editButton, profileButton, chartButton, answerButton, questButton, userID, cellAct, row);
                    }
                } catch {
                    console.error("error");
                }

            }
        });
        xhr.open("GET", "./api/users/read-range.php?from=" + from + "&to=" + to + "&key=" + sessionToken, true);
        xhr.send();
    }

    searchButton.addEventListener("click", function () {
        let id = idInput.value;
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let json = xhr.responseText;
                let patient = JSON.parse(json);
                let keys = Object.keys(patient);
                try {
                    layer.innerHTML = "";
                    let userID = patient["patientID"];
                    let firstName = patient["patient_fName"];
                    let lastName = patient["patient_lName"];
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

                    createButtons(deleteButton, editButton, profileButton, chartButton, answerButton, questButton, userID, cellAct, row);
                } catch {
                    console.error("error");
                }
            }
        });
        xhr.open("GET", "./api/users/read.php?id=" + id + "&key=" + sessionToken, true);
        xhr.send();
    });

    nextButton.addEventListener("click", function () {
        let xhr = new XMLHttpRequest();
        layer.innerHTML = "";
        from = to + 1;
        to = to + 50;
        getUsers(from, to);
    });

    prevButton.addEventListener("click", function () {
        let xhr = new XMLHttpRequest();
        layer.innerHTML = "";
        from = to - 99;
        to = to - 50;
        getUsers(from, to);
    });

    function deleteCheck(userID){
        if (confirm("Are you sure you want to delete this user?")){
            window.location = "./api/users/delete.php?id=" + userID + "";
        }
        else{
            window.alert("User was not deleted");
        }
    }

    function createButtons(deleteButton, editButton, profileButton, chartButton, answerButton, questButton, userID, cellAct, row){
        let editAnchor = document.createElement("a");
        let profileAnchor = document.createElement("a");
        let chartAnchor = document.createElement("a");
        let answerAnchor = document.createElement("a");
        let questionAnchor = document.createElement("a");

        deleteButton = document.createElement("button");
        deleteButton.classList.add("action-button");
        deleteButton.id = "delete-button";
        deleteButton.innerHTML = '<div class="svg-div"></div><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">\n' +
            '  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>\n' +
            '</svg></div>'
        deleteButton.addEventListener("click", deleteCheck)
        // deleteButton.href = "./api/users/delete.php" + userID + "";

        editButton = document.createElement("button");
        editButton.classList.add("action-button");
        editButton.id = "edit-button";
        editButton.innerHTML = '<div class="svg-div"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">\n' +
            '  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>\n' +
            '</svg></div>'
        editAnchor.href = "./edit-user.php?id=" + userID + "";
        editAnchor.appendChild(editButton);

        profileButton = document.createElement("button");
        profileButton.classList.add("action-button");
        profileButton.id = "profile-button";
        profileButton.innerHTML = '<div class="svg-div"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n' +
            '  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n' +
            '</svg></div>'
        profileAnchor.href = "./view-user.php?id=" + userID + "";
        profileAnchor.appendChild(profileButton);

        chartButton = document.createElement("button");
        chartButton.classList.add("action-button");
        chartButton.id = "chart-button";
        chartButton.innerHTML = '<div class="svg-div"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">\n' +
            '   <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>\n' +
            '</svg></div>'
        chartAnchor.href = "./charts.php?id=" + userID + "";
        chartAnchor.appendChild(chartButton);

        answerButton = document.createElement("button");
        answerButton.classList.add("action-button");
        answerButton.id = "answer-button";
        answerButton.innerHTML = '<div class="svg-div"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16">\n' +
            '  <path d="M5.921 11.9L1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>\n' +
            '</svg></div>'
        answerAnchor.href = "./answers.php?id=" + userID + "";
        answerAnchor.appendChild(answerButton);

        questButton = document.createElement("button");
        questButton.classList.add("action-button");
        questButton.innerHTML = '<div class="svg-div"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16">\n' +
            '  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>\n' +
            '</svg></div>'
        questButton.id = "quest-button";
        questionAnchor.href = "./create-question.php?id=" + userID + "";
        questionAnchor.appendChild(questButton);

        cellAct.appendChild(deleteButton);
        cellAct.appendChild(editAnchor);
        cellAct.appendChild(profileAnchor);
        cellAct.appendChild(chartAnchor);
        cellAct.appendChild(answerAnchor);
        cellAct.appendChild(questionAnchor);
        row.appendChild(cellAct);
    }

    getUsers(from, to);

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


// if(searchID!= null) {
//     console.log(searchID);
//     from = searchID;
//     to = searchID;
//     getUsers(from, to);
// }