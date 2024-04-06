// DOM Elements
const burger = document.querySelector("#burger");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".modalClose");
const modalForm = document.querySelector("[name='reserve']");

/****  Listener  ****/
closeBtn.addEventListener("click", closeModal);
modalForm.addEventListener("submit", validate);
burger.addEventListener("click", editNav);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", openModal));

// open modal form
function openModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function validate(event) {
  event.preventDefault();
  console.log(event);
}

function editNav() {
let header = document.getElementById("myTopnav");
  if (header.className === "topnav") {
    header.className += " responsive";
  } else {
    header.className = "topnav";
  }
}