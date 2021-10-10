const GAME_CONTENT = `GameContent`;
const ASSETS_FOLDER = `./assets/img/`;
const IMAGES = [
  "contract",
  "light-bulb",
  "piggy-bank",
  "shopping-bag",
  "statistics",
  "social-media",
  "influencer",
  "influencer (1)",
  "influencer (2)",
];
let RECORDS = [];
let IS_STARED = false;
const BLACK_BOX = ` <div class="black_box"></div>`;
let getImage = function (url) {
  return `            
        <div class="img_wrapper">
            <img src="${url}" alt="">
        </div>
    `;
};
let availableCells = function () {
  let arr = [];
  for (let i = 0; i < RECORDS.length; i++) {
    if (RECORDS[i] === "*") {
      arr.push(i);
    }
  }
  return arr;
};
let setSingleRecord = function (current_element) {
  let available_indexes = availableCells();
  let temp_index =
    available_indexes[Math.ceil(Math.random() * available_indexes.length - 1)];
  RECORDS[temp_index] = current_element;
};
let getNextImage = function () {
  let available_images = IMAGES.filter((e) => !RECORDS.includes(e));
  return available_images[
    Math.ceil(Math.random() * available_images.length - 1)
  ];
};

let initRecords = function (size) {
  RECORDS = "*".repeat(size * size).split("");
  if (size % 2 === 1) {
    IS_STARED = true;
    RECORDS[Math.ceil(Math.random() * RECORDS.length - 1)] = "star";
  }
  while (RECORDS.filter((e) => e == "*").length !== 0) {
    let current_element = getNextImage();
    setSingleRecord(current_element);
    setSingleRecord(current_element);
  }
};

let getMatrixSize = function () {
  const size = +prompt("Please enter the matrix size");
  return isNaN(size) ? 3 : Math.ceil(size);
};
let setCellAttributes = function (el, size) {
  //   grid-template-columns: 1fr 1fr 1fr;
  el.style.gridTemplateColumns = " 1fr".repeat(size);
};
let closeLoader = function () {
  document.getElementById("Loader").style.display = "none";
  document.getElementById("Board").style.display = "block";
};
let setInitialMarkup = function (el, size) {
  let markup = "";
  for (let i = 0; i < size * size; i++) {
    markup += `
      <div class='grid-cell'  track='${i}'>
            ${BLACK_BOX}
            ${getImage(`${ASSETS_FOLDER}${RECORDS[i]}.png`)}
      </div>
      `;
  }
  //   let markup = BLACK_BOX.repeat(size * size);
  el.innerHTML = markup;
};

let initMarkup = function (size) {
  let game_el = document.getElementById(GAME_CONTENT);
  setCellAttributes(game_el, size);
  setInitialMarkup(game_el, size);
  setTimeout(closeLoader, 200);
};

let checkCells = function () {
  const open_elements = document.getElementsByClassName("open");
  let first_element = open_elements[0];
  let second_element = open_elements[1];
  if (open_elements.length == 2) {
    let first_element_value = RECORDS[first_element.getAttribute("track")];
    let second_element_value = RECORDS[second_element.getAttribute("track")];
    if (first_element_value === second_element_value) {
      first_element.className = "grid-cell found";
      second_element.className = "grid-cell found";
    } else {
      first_element.className = "grid-cell";
      second_element.className = "grid-cell";
    }
  }
  if (
    open_elements.length == 1 &&
    IS_STARED &&
    document.getElementsByClassName("found").length ==
      document.getElementsByClassName("grid-cell").length - 1
  ) {
    open_elements[0].className = "grid-cell found";
    alert("You are the winner");
  }
};
let handleClick = function (e) {
  let el_block = e.target.parentNode;
  if (el_block.className.includes("open")) {
    el_block.className = "grid-cell";
  } else if (!el_block.className.includes("found")) {
    el_block.className = "grid-cell open";
  }
  checkCells();
};
let initActions = function () {
  let cells = document.getElementsByClassName("grid-cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", handleClick);
  }
};

let init = function () {
  const matrix_size = getMatrixSize();
  initRecords(matrix_size);
  initMarkup(matrix_size);
  initActions();
};

window.onload = function () {
  init();
};
