let cards_wrap = document.querySelector(".cards_wrap");
let isAllMangasButton = document.getElementById("isAllMangas");
let btnRefresh = document.querySelector(".btnRefresh");

let allMangaContainer = document.querySelector(".allMangaContainer");

let loader = document.querySelector(".loaderContainer");
let isAllMangas = false;

// Local Url
// http://127.0.0.1:8000/
// const url = "https://damien-auversack.be:8888";
const url = "http://127.0.0.1:5001";

// Online Url
// const url = "https://japscan-scraping-v2-server.herokuapp.com/";

const disabledButton = (selectElement, durationSecond) => {
  selectElement.disabled = true;
  setTimeout(() => (selectElement.disabled = false), durationSecond * 1000);
};

const startTimer = (duration, display) => {
  var timer = duration,
    seconds;
  objInterval = setInterval(function () {
    seconds = parseInt(timer % 60, 10);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = seconds;
    if (--timer < 0) {
      display.textContent = "";
      clearInterval(objInterval);
    }
  }, 1000);
};

isAllMangasButton.addEventListener("click", () => {
  isAllMangas = isAllMangasButton.checked;
});

btnRefresh.addEventListener("click", async () => {
  // if(isAllMangas) {
  //     startTimer(4, document.querySelector('#time'));
  //     disabledButton(document.querySelector('#eventRefresh'), 5);
  // }else {
  //     startTimer(4, document.querySelector('#time'));
  //     disabledButton(document.querySelector('#eventRefresh'), 5);
  // }
  btnRefreshEnabled(false);
  await getMangas();
  btnRefreshEnabled(true);
});

const getMangas = () => {
  return $.ajax({
    type: "GET",
    url: url,
    data: {
      isAllMangas: isAllMangas,
    },
    success: function (manga) {
      fillMangas(manga);
    },
  });
};

const fillMangas = (manga) => {
  clearCards();
  manga.forEach((element) => {
    cards_wrap.append(buildMangaCard(element));
  });
};

const loaderVisible = (enable) => {
  loader.style.display = enable ? "flex" : "none";
};

const btnRefreshVisible = (enable) => {
  btnRefresh.style.display = enable ? "block" : "none";
};

const allMangaContainerVisible = (enable) => {
  allMangaContainer.style.display = enable ? "flex" : "none";
};

const btnRefreshEnabled = (enable) => {
  btnRefresh.disabled = !enable;
};

const clearCards = () => {
  cards_wrap.innerHTML = "";
};

const buildMangaCard = (manga) => {
  let card_item = document.createElement("div");
  card_item.classList.add("card_item");

  let card_inner = document.createElement("div");
  card_inner.classList.add("card_inner", "bgCard");

  let titre = document.createElement("h2");
  titre.classList.add("title", "truncate-line-clamp");
  titre.appendChild(document.createTextNode(manga.titre));

  let titleContainer = document.createElement("div");
  titleContainer.classList.add("titleContainer", "truncate-line-clamp");
  titleContainer.appendChild(titre);

  let imgContainer = document.createElement("a");
  imgContainer.setAttribute("href", manga.urlJapscan);
  let img = document.createElement("img");
  img.classList.add("radius-2", "mb-1", "cursorPointer");

  img.setAttribute("src", manga.urlImage || "");
  img.setAttribute("alt", "Pas d'image");
  imgContainer.appendChild(img);

  let synopsis = document.createElement("h2");
  synopsis.classList.add("pb-1");
  synopsis.appendChild(document.createTextNode("synopsis"));

  let synopsisContainer = document.createElement("div");
  synopsisContainer.classList.add(
    "justifyText",
    "pb-2",
    "pr-2",
    "pl-2",
    "synopsisContainer"
  );

  let synopsisContent = document.createElement("span");
  synopsisContent.appendChild(
    document.createTextNode(manga.synopsis || "pas de synopsis")
  );
  synopsisContainer.appendChild(synopsisContent);

  card_inner.appendChild(titleContainer);
  card_inner.appendChild(imgContainer);
  //   card_inner.appendChild(synopsis);
  //   card_inner.appendChild(synopsisContainer);

  card_item.appendChild(card_inner);

  return card_item;
};

const main = async () => {
//   loaderVisible(true);
//   btnRefreshVisible(false);
//   allMangaContainerVisible(false);

//   await getMangas();

  loaderVisible(false);
  btnRefreshVisible(true);
  allMangaContainerVisible(true);
};

main();
