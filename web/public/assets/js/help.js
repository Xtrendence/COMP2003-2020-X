document.addEventListener("DOMContentLoaded", () => {
    let sessionToken = localStorage.getItem("sessionToken");

    verifySession(sessionToken).then(result => {
		try {
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

			/**
			 * @desc on DOM loaded, it checks to see if localStorage has the key:'theme', and if it does is it's value:'dark'.
			 *      when that is true, it sets the body with an attribute to turn the theme dark.
			 */
			checkTheme();
		} catch(error) {
			console.trace(error);
		}
    }).catch(error => {
        window.location.replace("./login.php");
    });
});