let eventRefresh = document.querySelector('#eventRefresh');
let cards_wrap = document.querySelector(".cards_wrap");

let isAllMangasButton = document.getElementById("isAllMangas");

let isAllMangas = false; 

// Local Url
// http://127.0.0.1:8000/
// const url = "http://127.0.0.1:5001/";

// Online Url 
const url = "https://japscan-scraping-v2-server.herokuapp.com/";

const disabledButton = (selectElement, durationSecond) => {
    selectElement.disabled = true;
    setTimeout(()=>selectElement.disabled = false, durationSecond * 1000);
};

const startTimer = (duration, display) => {
    var timer = duration, seconds;
    objInterval = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = seconds;
        if (--timer < 0) {
            display.textContent = "";
            clearInterval(objInterval)
        }
    }, 1000);
};

isAllMangasButton.addEventListener('click', ()=> {
    isAllMangas = isAllMangasButton.checked;
})

eventRefresh.addEventListener('click', () => {
    cards_wrap.innerHTML="";

    if(isAllMangas) {
        startTimer(14, document.querySelector('#time'));
        disabledButton(document.querySelector('#eventRefresh'), 15);
    }else {
        startTimer(9, document.querySelector('#time'));
        disabledButton(document.querySelector('#eventRefresh'), 10);
    }

    $.ajax({
        type: "GET",
        url: url,
        data: { 
            isAllMangas: isAllMangas
        },
        success: function (manga) {
            manga = JSON.parse(manga);
            manga.forEach(element => {
                cards_wrap.append(buildMangaCard(element));
            });           
        }
    });
});

const buildMangaCard = (manga) => {
    let card_item = document.createElement("div");
    card_item.classList.add("card_item");

    let card_inner = document.createElement("div");
    card_inner.classList.add("card_inner", "bgBlanchedalmond");
    
    let titre = document.createElement("h2");
    titre.classList.add("pb-2", "pt-2");
    titre.appendChild(document.createTextNode(manga.titre));

    let imgContainer = document.createElement("a");
    imgContainer.setAttribute("href", manga.urlJapscan);
    let img = document.createElement("img");
    img.classList.add("radius-2", "mb-1", "cursorPointer");

    img.setAttribute("src", manga.urlImage||"");
    img.setAttribute("alt", "Pas d'image");
    imgContainer.appendChild(img);

    let synopsis = document.createElement("h2");
    synopsis.classList.add("pb-1");
    synopsis.appendChild(document.createTextNode("synopsis"));

    let synopsisContainer = document.createElement("div");
    synopsisContainer.classList.add("justifyText", "pb-2", "pr-2", "pl-2");

    let synopsisContent = document.createElement("span");
    synopsisContent.appendChild(document.createTextNode(manga.synopsis || "pas de synopsis"));
    synopsisContainer.appendChild(synopsisContent);

    card_inner.appendChild(titre);
    card_inner.appendChild(imgContainer);
    card_inner.appendChild(synopsis);
    card_inner.appendChild(synopsisContainer);

    card_item.appendChild(card_inner);

    return card_item;
};