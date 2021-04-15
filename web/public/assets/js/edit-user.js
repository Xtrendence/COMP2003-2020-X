document.addEventListener("DOMContentLoaded", () => {
    let url = new URL(window.location.href);
    let qID = url.searchParams.get("id");
    let titleCard = document.getElementById("user-id");
    let title = "Edit User - User ";
    let addID = title.concat(qID);
    titleCard.innerText = addID;

    function getUser(){
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                console.log("1");
                let json = xhr.responseText;
                let questions = JSON.parse(json);
                let keys = Object.keys(questions["data"]);
                console.log("2");
                try{
                    let question = questions["data"];
                    for (let i = 0; i < keys.length; i++){
                        let questionID = question[qID]["questionID"];
                        let questionTxt = question[qID]["question"];
                        let questionLim = question[qID]["question_charLim"];
                        let questionType = question[qID]["question_type"];
                        let questionChoice = question[qID]["choices"];
                        console.log(questionTxt);
                        enquiry.innerText = questionTxt;
                    }

                }
                catch{
                    console.error("error");
                }
            }
        });
        xhr.open("GET", "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/questions/read.php?id=" + qID + "&key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6" , true);
        xhr.send();
    }

});