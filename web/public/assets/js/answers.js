document.addEventListener("DOMContentLoaded", () => {

    let del =  document.getElementById("del");

    let url = new URL(window.location.href);
    let patID = url.searchParams.get("id");

    let titleCard = document.getElementById("question-answer");
    let title = "Questions & Answers - User ";
    let addID = title.concat(patID);
    titleCard.innerText = addID;

    
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let json = xhr.responseText;
                let answers= JSON.parse(json);
                console.log(answers);
        }
    });
    xhr.open("GET", "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/answers/read-user.php?id="+ patID + "&key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6", true);
    xhr.send();

    del.addEventListener("click", function() {
        /*delete question from data base
        * refresh page
        */
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

});