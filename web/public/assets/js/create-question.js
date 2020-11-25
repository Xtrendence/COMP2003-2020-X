document.addEventListener("DOMContentLoaded", () => {

    let multipleChoiceOption = document.getElementById("multiple-choice-op");
    let option = document.getElementById("multiple");

    multipleChoiceOption.addEventListener("click", function() {

        if (multipleChoiceOption.className === "form-radio-button") {
            option.classList.remove("hidden");

            multipleChoiceOption.classList.add("active");

        } else {
            option.classList.add("hidden");

            multipleChoiceOption.classList.remove("active");
        }
    });
});