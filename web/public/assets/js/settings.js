document.addEventListener("DOMContentLoaded", () => {
    verifySession(localStorage.getItem("sessionToken")).then(result => {

        let togglePosition = document.getElementById("toggleBut");
        let toggleContainer = document.getElementById('toggle');

        let logout = document.getElementById('logout');
        let sessionToken = localStorage.getItem("sessionToken");

        /**
         * @desc when toggle is clicked, the page will switch between a light mode and dark mode
         * adds and removes the theme appropriatly from local storage
         */
        toggleContainer.addEventListener('click', function(){
            if (document.body.hasAttribute('data-theme','dark')){
                document.body.removeAttribute('data-theme', 'dark');
                togglePosition.classList.remove("toggle-button-active");
                localStorage.removeItem('theme', 'dark');
            } else {
                document.body.setAttribute('data-theme', 'dark');
                togglePosition.classList.add("toggle-button-active");
                localStorage.setItem('theme', 'dark');
            }
        });

        /**
         * @desc logout button calls the logout api then returns user to login page.
         */
        logout.addEventListener('click', function(){
            let xhr = new XMLHttpRequest();

            xhr.open("POST", "../../api/admins/logout.php?key=" + sessionToken + "", true);
            xhr.send(JSON.stringify(body));

            xhr.addEventListener("readystatechange", function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    let responseJSON = xhr.responseText;

                    try {
                        let response = JSON.parse(responseJSON);
                        localStorage.removeItem('sessionToken', sessionToken);
                    } catch(e) {
                        console.log(e);
                    }
                }
            });

        });

        /**
        * @desc on DOM loaded, it checks to see if localStorage has the key:'theme', and if it does is it's value:'dark'.
        *      when that is true, it sets the body with an attribute to turn the theme dark.
        */
        if(localStorage.getItem('theme') === 'dark'){
            document.body.setAttribute('data-theme', 'dark');
            togglePosition.classList.add("toggle-button-active")
        } else {
            document.body.removeAttribute('data-theme', 'dark');
            togglePosition.classList.remove("toggle-button-active")
        }
    }).catch(error => {
        window.location.replace("./login.php");
    });
});