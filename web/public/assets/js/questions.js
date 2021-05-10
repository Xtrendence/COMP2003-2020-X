document.addEventListener("DOMContentLoaded", () => {

    let sessionToken = localStorage.getItem("sessionToken");

        verifySession(sessionToken).then(result => {
            try {

                let wideCard;
                let cardWrap = document.getElementById("cards");
                const xhr = new XMLHttpRequest();
                let layer = document.getElementById("cards");

                let from = 1;
                let to = 5;





                function getQuestions(from, to) {
                    xhr.addEventListener("readystatechange", function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            let json = xhr.responseText;
                            let users = JSON.parse(json);


                            if ("data" in users) {
                                let keys = Object.keys(users["data"]);

                                try {
                                    layer.innerHTML = "";
                                    let question = users["data"];
                                    for (let i = 0; i < keys.length; i++) {


                                    /* Variables used for "read" api endpoint field values */
                                    let questionID = question[i]["questionID"];
                                    let q = question[i]["question"];
                                    let questionLim = question[i]["question_charLim"];
                                    let questionType = question[i]["question_type"];
                                    let choices = question[i]["choices"];



                                    /*questionCard(wideCard, questionID, q, questionLim, questionType);
                                    choiceCard(wideCard, questionID, q, questionLim, questionType, choices);*/

                                    if (questionType == "choice") {



                                        choiceCard(wideCard, questionID, q, questionLim, questionType, choices);


                                    } else {
                                        questionCard(wideCard, questionID, q, questionLim, questionType);
                                    }



                                    }

                                } catch {
                                    console.log("error");


                                }

                            }

                            else {

                            }



                        }


                    });


                    xhr.open("GET", "./api/questions/read-all.php?from=" + from + "&to=" + to + "&key=" + result.token, true);
                    xhr.send();

                }




                function questionCard(wideCard, questionID, q, questionLim, questionType) {

                    let cardAnchor = document.createElement("a");

                    wideCard = document.createElement("div");
                    wideCard.classList.add("question-wide-card");
                    wideCard.id = "wide-card";
                    wideCard.innerHTML = '\n' +
                        '        <div class="text-margin">\n' +
                        '            <span class="card-heading">Question ID: <span class="card-text">'+ questionID +'</span> </span>\n' +
                        '        </div>\n' +
                        '\n' +
                        '        <div class="text-margin">\n' +
                        '            <span class="card-heading">Question: <span class="card-text">'+ q +'</span> </span>\n' +
                        '        </div>\n' +
                        '\n' +
                        '        <div class="text-margin">\n' +
                        '            <span class="card-heading">Character Limit: <span class="card-text">'+ questionLim +'</span></span>\n' +
                        '        </div>\n' +
                        '\n' +
                        '        <div class="text-margin">\n' +
                        '            <span class="card-heading">Type: <span class="card-text">'+ questionType +'</span> </span>\n' +
                        '        </div>\n' +
                        '\n' +
                        '       <div class="card-button-wrapper">\n' +
                        '             <button type="button" class="delete-button"><svg class="SVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"/></svg></button>\n' +
                        '             <button type="button" class="edit-button"><svg class="SVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"/></svg></button>\n' +
                        '       </div>\n' +

                        '    </div>'


                    cardAnchor.appendChild(wideCard);
                    cardWrap.appendChild(cardAnchor);

                }

                getQuestions(from, to);

                function choiceCard(wideCard, questionID, q, questionLim, questionType, choices) {

                    try {
                        let cardAnchor = document.createElement("a");

                        let printout = Object.keys(choices).length;


                        wideCard = document.createElement("div");
                        wideCard.classList.add("question-wide-card");
                        wideCard.id = "wide-card";



                        wideCard.innerHTML = '\n' +
                            '        <div class="text-margin">\n' +
                            '            <span class="card-heading">Question ID: <span class="card-text">' + questionID + '</span> </span>\n' +
                            '        </div>\n' +
                            '\n' +
                            '        <div class="text-margin">\n' +
                            '            <span class="card-heading">Question: <span class="card-text">' + q + '</span> </span>\n' +
                            '        </div>\n' +
                            '\n' +
                            '        <div class="text-margin">\n' +
                            '            <span class="card-heading">Type: <span class="card-text">' + questionType + '</span> </span>\n' +
                            '        </div>\n' +
                            '\n' +
                            '        <div class="text-margin">\n' +
                            '            <span class="card-heading">Choices: <span class="card-text">' + Object.values(choices).join(", ") + '</span> </span>\n' +
                            '        </div>\n' +
                            '\n' +
                            '       <div class="card-button-wrapper">\n' +
                            '             <button type="button" class="delete-button"><svg class="SVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"/></svg></button>\n' +
                            '             <button type="button" class="edit-button"><svg class="SVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"/></svg></button>\n' +
                            '       </div>\n' +

                            '    </div>'

                        cardAnchor.appendChild(wideCard);


                        wideCard.getElementsByClassName("delete-button")[0].addEventListener("click", () => {
                            // API request to delete the question

                            try {
                                if (xhr.responseText === "") {
                                    document.getElementById(questionID).remove();
                                } else {
                                    console.log(xhr.responseText);
                                }
                            } catch(error) {
                                console.log(error);
                            }
                        });

                        cardWrap.appendChild(cardAnchor);





                    } catch {
                        console.log("error");
                    }


                }



                document.getElementById("prev-button").addEventListener("click", function () {
                    layer.innerHTML = "";
                    from = to - 4 ;
                    to = to - 5 ;
                    getQuestions(from, to);
                });


                document.getElementById("next-button").addEventListener("click", function () {
                    layer.innerHTML = "";
                    from = to + 1;
                    to = to + 5;
                    getQuestions(from, to);
                });


                document.getElementById("ask-button").addEventListener("click", function () {

                });


                document.getElementById("").addEventListener("click", function () {

                });


                document.getElementById("").addEventListener("click", function () {

                });



                /**
                 * @desc on DOM loaded, it checks to see if localStorage has the key:'theme', and if it does is it's value:'dark'.
                 *      when that is true, it sets the body with an attribute to turn the theme dark.
                 */
                if(localStorage.getItem('theme') === 'dark') {
                    document.body.setAttribute('data-theme', 'dark');
                } else {
                    document.body.removeAttribute('data-theme', 'dark');
                }

            } catch(error) {
                console.trace(error);
            }
        }).catch(error => {
            window.location.replace("./login.php");
        });





});