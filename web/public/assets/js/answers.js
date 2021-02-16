document.addEventListener("DOMContentLoaded", () => {

    let url = new URL(window.location.href);
    let patID = url.searchParams.get("id");

    let titleCard = document.getElementById("question-answer");
    let title = "Questions & Answers - User ";
    let addID = title.concat(patID);
    titleCard.innerText = addID;

    const xhr = new XMLHttpRequest();

    let contentNoAns = document.getElementById("content-not-answered");
    let contentAns = document.getElementById("content-answered");
    let del =  document.getElementById("del");

    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let json = xhr.responseText;
                let ans = JSON.parse(json);
                let keys = Object.keys(ans["data"]);

                try {
                    contentNoAns.innerHTML = "";
                    contentAns.innerHTML = "";
                    let quest = ans["data"];
                    for (let i = 0; i < keys.length; i++){
                        let question = quest[i]["question"];
                        let questionType = quest[i]["question_type"];
                        let answer = quest[i]["answer"];
                        let choices = quest[i]["choices"];

                        let cardDiv = document.createElement("div");
                        cardDiv.classList.add("wide-card");
                        cardDiv.id = i;

                        let titleSpan = document.createElement("span");
                        titleSpan.classList.add("titleSpan")
                        let span = document.createElement("span");
                        titleSpan.innerHTML = (question);
                        if (questionType == "choice") {
                            let choiceStr = "";
                            let choiceKeys = Object.keys(choices);

                            for (let j = 0; j < choiceKeys.length; j++){
                                if (j == 0) {
                                    choiceStr = choiceStr.concat(choices[j]);
                                } else {
                                    choiceStr = choiceStr.concat(", ");
                                    choiceStr = choiceStr.concat(choices[j]);
                                }
                            }
                            
                            span.innerHTML = ("<br />" + "Question Type: " + questionType + "<br />" + "Choices: " + choiceStr + "<br />" + "Answer: " + answer);
                        } else {
                            let charLim = quest[i]["question_charLim"];
                            span.innerHTML = ("<br />" + "Question Type: " + questionType + "<br />" + "Character Limit: " + charLim + "<br />" + "Answer: " + answer);
                        }

                        let spanContainer = document.createElement("div");
                        spanContainer.classList.add("text-wrapper");

                        let titleContainer = document.createElement("div");
                        titleContainer.classList.add("question-wrapper");

                        spanContainer.appendChild(span)
                        titleContainer.appendChild(titleSpan);
                        cardDiv.appendChild(titleContainer);
                        cardDiv.appendChild(spanContainer);
                        if (answer == "") {
                            let delContainer = document.createElement("div");
                            delContainer.classList.add("button-wrapper");
                            let delAnchor = document.createElement("a");
                            let delBut = document.createElement("button");
                            delBut.classList.add("delete-button");
                            delBut.textContent = 'Delete';
                            delAnchor.appendChild(delBut);
                            delContainer.appendChild(delAnchor);
                            cardDiv.appendChild(delContainer);
                            contentNoAns.appendChild(cardDiv);
                        } else {
                            contentAns.appendChild(cardDiv);
                        }
                    }
                } catch {
                    console.error("error");
                }
        }
    });
    xhr.open("GET", "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/answers/read-user.php?id="+ patID + "&key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6", true);
    xhr.send();

    

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