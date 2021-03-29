document.addEventListener("DOMContentLoaded", () => {

    let togglePosition = document.getElementById("toggleBut");
    let toggleContainer = document.getElementById('toggle');

    let logout = document.getElementById('logout');
    let sessionToken = localStorage.getItem("sessionToken");

    toggleContainer.addEventListener('click', function(){
        if (document.body.hasAttribute('data-theme','dark')){
            document.body.removeAttribute('data-theme', 'dark');
            togglePosition.classList.remove("toggle-button-active")
            localStorage.removeItem('theme', 'dark')
        } else {
            document.body.setAttribute('data-theme', 'dark');
            togglePosition.classList.add("toggle-button-active")
            localStorage.setItem('theme', 'dark')
        }
    });

    logout.addEventListener('click', function(){
        let xhr = new XMLHttpRequest();

        xhr.open("POST", "../../api/admins/logout.php?key=" + sessionToken+ "", true);
        xhr.send(JSON.stringify(body));

        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let responseJSON = xhr.responseText;

                try {
                    let response = JSON.parse(responseJSON);
                } catch(e) {
                    console.log(e);
                }
            }
        });
        
    });

    if(localStorage.getItem('theme') === 'dark'){
        document.body.setAttribute('data-theme', 'dark');
        togglePosition.classList.add("toggle-button-active")
    } else {
        document.body.removeAttribute('data-theme', 'dark');
        togglePosition.classList.remove("toggle-button-active")
    }


});