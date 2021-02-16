document.addEventListener("DOMContentLoaded", () => {

    let togglePosition = document.getElementById("toggleBut");
    let toggleContainer = document.getElementById('toggle');

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

    if(localStorage.getItem('theme') === 'dark'){
        document.body.setAttribute('data-theme', 'dark');
        togglePosition.classList.add("toggle-button-active")
    } else {
        document.body.removeAttribute('data-theme', 'dark');
        togglePosition.classList.remove("toggle-button-active")
    }


});