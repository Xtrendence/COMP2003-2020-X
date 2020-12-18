document.addEventListener("DOMContentLoaded", () => {

    /** variable made from button Class "drop-down" in the help.php */

    let drop = document.getElementsByClassName("drop-down");

    /** Event listener included within for loop for the button to reveal the hidden text and turn caret svg 90 degrees right */

    for (let i = 0; i < drop.length; i++) {
        drop[i].addEventListener("click", function() {
            this.classList.toggle("active");
            this.getElementsByClassName("caret-icon")[0].classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });

    }

});









