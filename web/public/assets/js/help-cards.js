
    document.addEventListener("DOMContentLoaded", () => {

    /** variable made from button Class "drop-down" in the help.php */

    let drop = document.getElementsByClassName("drop-down");
    let i;

    let caret = document.getElementsByClassName("caret-icon");

    /** Event listener included within for loop for the button to reveal the hidden text */

    for (i = 0; i < drop.length; i++) {
        drop[i].addEventListener("click", function() {
            this.classList.toggle("active");
            caret[i].classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });

    }

});









