document.addEventListener("DOMContentLoaded", () => {

    document.getElementById('toggle').addEventListener('click', function(event){
        if (document.body.hasAttribute('data-theme','dark')){
            document.body.removeAttribute('data-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'dark');
        }
    });

});