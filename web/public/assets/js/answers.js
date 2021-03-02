document.addEventListener("DOMContentLoaded", () => {

    let url = new URL(window.location.href);
    let patID = url.searchParams.get("id");

    let titleCard = document.getElementById("question-answer");
    let title = "Questions & Answers - User ";
    let addID = title.concat(patID);
    titleCard.innerText = addID;

    let dropdownButton = document.getElementById("dropdown-button");
    let dropdownContent = document.getElementById("dropdown-content");
    
    let qAll = document.getElementById("dd-1");
    let qMost = document.getElementById("dd-2");
    let qAnswered = document.getElementById("dd-3");
    let qUnanswered = document.getElementById("dd-4");


    const xhr = new XMLHttpRequest();

    let recentNoAns = document.getElementById("content-not-answered-recent");
    let contentNoAns = document.getElementById("content-not-answered");
    let contentAns = document.getElementById("content-answered");
    let del =  document.getElementById("del");

    let seperator = document.getElementById("sep")
    let seperator2 = document.getElementById("sep2")

    //let recentQuestion = contentNoAns.lastChild.nodeValue;
    //console.log(recentQuestion);

    dropdownButton.addEventListener('click', function() {
        if (dropdownContent.classList.contains("hidden")) {
            dropdownContent.classList.remove("hidden");
            dropdownContent.classList.add("dropdown-content");
            dropdownButton.classList.add("dropdown-button-radius");
        }
        else {
            dropdownContent.classList.add("hidden");
            dropdownButton.classList.remove("dropdown-button-radius");
        }
    });

    qAll.addEventListener('click', function() {
        dropdownButton.innerHTML = "All Questions";
        dropdownContent.classList.add("hidden");
        dropdownButton.classList.remove("dropdown-button-radius");

        let caretContainer = document.createElement("div");
        caretContainer.classList.add("caret-container");
        let rightCaret = document.createElement("span");
        rightCaret.classList.add("right-caret");
        
        let leftCaret = document.createElement("span");
        leftCaret.classList.add("left-caret");

        caretContainer.appendChild(leftCaret);
        caretContainer.appendChild(rightCaret);
        dropdownButton.appendChild(caretContainer);

        if (contentAns.classList("hidden")) {
            contentAns.classList.remove("hidden");
        }
        if (contentNoAns.classList("hidden")) {
            contentNoAns.classList.remove("hidden");
        }
        if (recentNoAns.classList("hidden")) {
            recentNoAns.classList.remove("hidden")
        }
        if (seperator.classList("hidden")) {
            seperator.classList.remove("hidden")
        }
        if (seperator2.classList("hidden")) {
            seperator2.classList.remove("hidden")
        }
    });

    qMost.addEventListener('click', function() {
        dropdownButton.innerHTML = "Most Recent Question";
        dropdownContent.classList.add("hidden");
        dropdownButton.classList.remove("dropdown-button-radius");

        let caretContainer = document.createElement("div");
        caretContainer.classList.add("caret-container");
        let rightCaret = document.createElement("span");
        rightCaret.classList.add("right-caret");
        
        let leftCaret = document.createElement("span");
        leftCaret.classList.add("left-caret");

        caretContainer.appendChild(leftCaret);
        caretContainer.appendChild(rightCaret);
        dropdownButton.appendChild(caretContainer);

        if (recentNoAns.classList("hidden")) {
            recentNoAns.classList.remove("hidden");
        }
        if (!contentAns.classList("hidden")) {
            contentAns.classList.add("hidden");
        }
        if (!contentNoAns.classList("hidden")) {
            contentNoAns.classList.add("hidden");
        }
    });

    qAnswered.addEventListener('click', function() {
        dropdownButton.innerHTML = "Answered Questions";
        dropdownContent.classList.add("hidden");
        dropdownButton.classList.remove("dropdown-button-radius");

        let caretContainer = document.createElement("div");
        caretContainer.classList.add("caret-container");
        
        let rightCaret = document.createElement("span");
        rightCaret.classList.add("right-caret");

        let leftCaret = document.createElement("span");
        leftCaret.classList.add("left-caret");

        caretContainer.appendChild(leftCaret);
        caretContainer.appendChild(rightCaret);
        dropdownButton.appendChild(caretContainer);

        if (contentAns.classList("hidden")) {
            contentAns.classList.remove("hidden");
        }
        if (!contentNoAns.classList("hidden")) {
            contentNoAns.classList.add("hidden");
        }
        if (!recentNoAns.classList("hidden")) {
            recentNoAns.classList.add("hidden");
        }
    });

    qUnanswered.addEventListener('click', function() {
        dropdownButton.innerHTML = "Unanswered Questions";
        dropdownContent.classList.add("hidden");
        dropdownButton.classList.remove("dropdown-button-radius");

        let caretContainer = document.createElement("div");
        caretContainer.classList.add("caret-container");
        
        let rightCaret = document.createElement("span");
        rightCaret.classList.add("right-caret");

        let leftCaret = document.createElement("span");
        leftCaret.classList.add("left-caret");

        caretContainer.appendChild(leftCaret);
        caretContainer.appendChild(rightCaret);
        dropdownButton.appendChild(caretContainer);

        if (contentNoAns.classList("hidden")) {
            contentNoAns.classList.remove("hidden");
        }
        if (recentNoAns.classList("hidden")) {
            recentNoAns.classList.remove("hidden")
        }
        if (!contentAns.classList("hidden")) {
            contentAns.classList.add("hidden");
        }
        if (seperator.classList("hidden")) {
            seperator.classList.remove("hidden")
        }
    });

    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            try{
                let json = xhr.responseText;
                let ans = JSON.parse(json);
                let keys = Object.keys(ans["data"]);

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
                        let choice = [];
                        let choiceKeys = Object.keys(choices);

                        for (let j = 0; j < choiceKeys.length; j++){
                            choice.push(choices[j+1]);
                        }
                        let choiceStr = choice.join(",");
                        span.innerHTML = ("<br />Question Type: " + questionType + "<br />Choices: " + choiceStr + "<br />Answer: " + answer);
                    } else {
                        let charLim = quest[i]["question_charLim"];
                        span.innerHTML = ("<br />Question Type: " + questionType + "<br />Character Limit: " + charLim + "<br />Answer: " + answer);
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

                    recentQuestion
                } catch {
                    seperator.classList.add("hidden");
                    seperator2.classList.add("hidden");
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