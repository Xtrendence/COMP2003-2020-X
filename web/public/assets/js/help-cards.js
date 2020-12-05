
/** variables made from id's in the help.php
 * all are in order as seen in the php file
 */


document.addEventListener("DOMContentLoaded", () => {




    let caret1 = document.getElementsByTagName("body-text1");
    let caret2 = document.getElementsByTagName("body-text2");
    let caret3 = document.getElementsByTagName("body-text3");
    let caret4 = document.getElementsByTagName("body-text4");
    let caret5 = document.getElementsByTagName("body-text5");
    let caret6 = document.getElementsByTagName("body-text6");
    let caret7 = document.getElementsByTagName("body-text7");



    let reveal1 = document.getElementsByClassName("caret-text1");
    let reveal2 = document.getElementsByClassName("caret-text2");
    let reveal3 = document.getElementsByClassName("caret-text3");
    let reveal4 = document.getElementsByClassName("caret-text4");
    let reveal5 = document.getElementsByClassName("caret-text5");
    let reveal6 = document.getElementsByClassName("caret-text6");
    let reveal7 = document.getElementsByClassName("caret-text7");



    reveal1.addEventListener("click", () => {
        caret1.classList.remove("hidden");
        caret2.classList.add("hidden");
        caret3.classList.add("hidden");
        caret4.classList.add("hidden");
        caret5.classList.add("hidden");
        caret6.classList.add("hidden");
        caret7.classList.add("hidden");

    });




});


