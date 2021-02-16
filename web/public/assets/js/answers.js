document.addEventListener("DOMContentLoaded", () => {

    let del =  document.getElementById("del");

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