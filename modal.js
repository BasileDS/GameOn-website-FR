// DOM Elements
const burger = document.querySelector("#burger");
const modalbg = document.querySelector(".bground");
const modalCtnt = document.querySelector(".content");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".modalClose");
const modalForm = document.querySelector("[name='reserve']");
const formInputs = document.querySelectorAll("[name='reserve'] input");
const dateInput = document.querySelector("#birthdate");
const successDiv = document.querySelector('.formSuccess');
const newRegistrationButton = document.querySelector('#newRegBtn');
const formData = document.querySelectorAll('.formData');

/****  Listeners  ****/
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", openModal));
closeBtn.addEventListener("click", closeModal);
burger.addEventListener("click", editNav);

// Wait modal animation end to hide modal
modalCtnt.addEventListener("animationend", () => {
  const isModalClosed = modalCtnt.classList.contains('content-close');
  if (isModalClosed) {
    modalCtnt.classList.remove('content-close');
    modalbg.style.display = "none";
  }
});

// Switch success message to a reseted Form if new form button is clicked
newRegistrationButton.addEventListener("click", (event) => {
  modalForm.reset();
  removeFormAttributes();
  modalForm.classList.toggle('hidden');
  successDiv.classList.toggle('hidden');
});

// Check all input values and show success message if passed
modalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formValidation();
});

// Stores inputs in an array
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("change", (event) => {
    event.preventDefault();
    verifyInput(formInputs[i]);
  });
}

// Form validation
function formValidation() {
  // define form success validation variable
  let successScore = 0;
  // display success message if all field are validate
  function showSuccessMessage() {
    if (successScore === 5) {
      modalForm.classList.add('hidden');
      successDiv.classList.remove('hidden');
    }
  }
  // loop on inputs to check and submit if clean
  for (let i = 0; i < formInputs.length; i++) {
    const inputField = formInputs[i];
    inputField.value = inputField.value.trim();
    switch (inputField.id) {
      case 'first':
      case 'last':
        !isEmpty(inputField) ? !checkLenght(inputField, 2) ? !checkCaracters(inputField) ? successScore++ : '' : '' : '';
        break;
      case 'email':
        !isEmpty(inputField) ? validateEmail(inputField) ? successScore++ : '' : '';
        break;
      case 'birthdate':
        !isEmpty(inputField) ? !validateDate(inputField) ? successScore++ : '' : '';
        break;
      case 'quantity':
        !isEmpty(inputField) ? !checkQuantity(inputField, 0, 100) ? successScore++ : '' : '';
        break;
      case 'checkbox1':
        isTermAndConditionsChecked(inputField) ? successScore++ : '';
        break;
      default:
        break;
    }
    //check if a location has been selected
    showSuccessMessage();
  }
}

// check if the attribute is a submit button
function isSubmit(e) {
  if (e.type === 'submit') {
    return false;
  } else {
    return true;
  }
}

// check if inputs are filled
function isEmpty(e) {
  if (e.value === '') {
    e.closest('.formData').setAttribute('data-error-visible', 'true');
    e.closest('.formData').setAttribute('data-error', 'Champ requis');
    return true;
  } else {
    e.closest('.formData').setAttribute('data-error-visible', 'false');
    return false;
  }
}

// check if 'e'lement length is higher than 'n'umber
function checkLenght(e, n) {
  inputValue = e.value;
  inputValueLength = inputValue.length;
  console.log(e);
  if (inputValueLength < n) {
    e.closest('.formData').setAttribute('data-error-visible', 'true');
    e.closest('.formData').setAttribute('data-error', 'Le champ doit contenir au moins 2 caractères');
    return true;
  } else {
    e.closest('.formData').setAttribute('data-error-visible', 'false');
    return false;
  }
}

// check if the string contains anything other than alphabetical letters
function checkCaracters(e) {
  const regex = /^[a-zA-Z]+(?:[-\s][a-zA-Z]+)*$/;
  const result = regex.test(e.value);
  if (!result) {
    e.closest('.formData').setAttribute('data-error-visible', 'true');
    e.closest('.formData').setAttribute('data-error', 'Ce champ ne peut contenir que des lettres');
    return false;
  } else {
    e.closest('.formData').setAttribute('data-error-visible', 'false');
  }
}

// check if the email format is valid
function validateEmail(e) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const result = regex.test(e.value);
  if (!result) {
    e.closest('.formData').setAttribute('data-error-visible', 'true');
    e.closest('.formData').setAttribute('data-error', 'Veuillez rentre un email valide');
  } else {
    e.closest('.formData').setAttribute('data-error-visible', 'false');
    return true;
  }
}

// compare current date and input date
function isPastDate(e) {
  const inputDate = e.valueAsDate;
  inputDateTime = inputDate.getTime();
  const date = new Date();
  const currentDateTime = date.getTime();
  if (inputDateTime < currentDateTime) {
    return true;
  } else {
    return false;
  }
}


// check if the birthdate format is valid
function validateDate(e) {
  const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  const result = regex.test(e.value);
  const dateTest = isPastDate(e);
  if (!result || !dateTest) {
    e.closest('.formData').setAttribute('data-error-visible', 'true');
    e.closest('.formData').setAttribute('data-error', 'Veuillez saisir une date valide');
  } else {
    e.closest('.formData').setAttribute('data-error-visible', 'false');
  }
}

// Check if element value is between f and l
function checkQuantity(e, f, l) {
  if (e.value >= f && e.value <= l) {
    e.closest('.formData').setAttribute('data-error-visible', 'false');
  } else {
    e.closest('.formData').setAttribute('data-error-visible', 'true');
    e.closest('.formData').setAttribute('data-error', 'Veuillez sélectionner un chiffre entre 0 et 99');
  }
}

// Check if conditions are checked
function isTermAndConditionsChecked(e) {
  if (!e.checked) {
    e.closest('.formData').setAttribute('data-error-visible', 'true');
    e.closest('.formData').setAttribute('data-error', 'Vous devez accepter les conditions pour participer');
  } else {
    e.closest('.formData').setAttribute('data-error-visible', 'false');
  } 
}

// Remove all formData attributes
function removeFormAttributes() {
  for (let i = 0; i < formData.length; i++) {
    const formDataInput = formData[i];
    formDataInput.removeAttribute('data-error-visible');  
  }
}

// Check input according to the id
function verifyInput(e) {
  switch (e.id) {
    case 'first':
    case 'last':
      !isEmpty(e) ? !checkLenght(e, 2) ? !checkCaracters(e) ? '' : '' : '' : '';
      break;
    case 'email':
      !isEmpty(e) ? validateEmail(e) ? '' : '' : '';
      break;
    case 'birthdate':
      !isEmpty(e) ? !validateDate(e) ? '' : '' : '';
      break;
    case 'quantity':
      !isEmpty(e) ? !checkQuantity(e, 0, 100) ? '' : '' : '';
      break;
    case 'checkbox1':
      isTermAndConditionsChecked(e) ? '' : '';
      break;
    default:
      break;
  }
}

// Header responsive elements
function editNav() {
  let header = document.getElementById("myTopnav");
    if (header.className === "topnav") {
      header.className += " responsive";
    } else {
      header.className = "topnav";
    }
}

// open modal form
function openModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  modalCtnt.classList.add('content-close');
}