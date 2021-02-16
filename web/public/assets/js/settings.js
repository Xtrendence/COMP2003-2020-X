document.addEventListener("DOMContentLoaded", () => {

    document.getElementById('toggle').addEventListener('change', function(event){
        (event.target.checked) ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
    });

});