document.addEventListener("DOMContentLoaded", () => {

    let drop = document.getElementsByClassName("drop-down");
    let i;

    for (i = 0; i < drop.length; i++) {
        drop[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }




});







    /** variables made from Classes in the help.php
     * all are in order as seen in the php file
     */