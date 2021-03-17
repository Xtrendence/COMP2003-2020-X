document.addEventListener("DOMContentLoaded", () => {

    console.log("123");
    let wideCard;
    let cardWrap = document.getElementById("cards");


    function questionCard(wideCard){

        let cardAnchor = document.createElement("a");

        wideCard = document.createElement("div");
        wideCard.classList.add("wide-card");
        wideCard.id = "wideCard";
        wideCard.innerHTML = ' <div class="text-margin">\n' +
            '            <span class="card-heading">Patient ID:</span>\n' +
            '        </div>\n' +
            '\n' +
            '        <div class="text-margin">\n' +
            '            <span class="card-heading">Question ID:</span>\n' +
            '        </div>\n' +
            '\n' +
            '        <div class="text-margin">\n' +
            '            <span class="card-heading">Question:</span>\n' +
            '        </div>\n' +
            '\n' +
            '        <div class="text-margin">\n' +
            '            <span class="card-heading">Character Limit:</span>\n' +
            '        </div>\n' +
            '\n' +
            '        <div class="text-margin">\n' +
            '            <span class="card-heading">Type:</span>\n' +
            '        </div>\n' +
            '\n' +
            '    </div>'


        cardAnchor.appendChild(wideCard);
        cardWrap.appendChild(cardAnchor);
    }

    questionCard(wideCard);

});