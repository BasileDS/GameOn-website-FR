// DOM Elements
const burger = document.querySelector("#burger");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".modalClose");
const modalForm = document.querySelector("[name='reserve']");
const formInputs = document.querySelectorAll("[name='reserve'] input");
const successDiv = document.querySelector('.formSuccess');
const newRegistrationButton = document.querySelector('#newRegBtn');


/****  Listeners  ****/
closeBtn.addEventListener("click", closeModal);
burger.addEventListener("click", editNav);
modalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formValidation();
});
newRegistrationButton.addEventListener("click", (event) => {
  modalForm.reset();
  modalForm.classList.remove('hidden');
  successDiv.classList.add('hidden');
})





// Listen to the fields before submiting
/*modalForm.addEventListener('change', (event) => {
  const valeurNom = event.target.value;
  if (valeurNom === "bbb") {
      console.log('Le champ nom est vide');
  } else {
      console.log('Le champ nom est rempli');
  }
});*/

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

  for (let i = 0; i < formInputs.length; i++) {
    const inputField = formInputs[i];
    inputField.value = inputField.value.trim();
    switch (inputField.id) {
      case 'first':
      case 'last':
        if (checkLenght(inputField, 2) === false) {
          inputField.closest('.formData').setAttribute('data-error-visible', 'true');
          inputField.closest('.formData').setAttribute('data-error', 'Le champ doit contenir au moins 2 caractères');
        } else if (checkCaracters(inputField) === false) {
          inputField.closest('.formData').setAttribute('data-error-visible', 'true');
          inputField.closest('.formData').setAttribute('data-error', 'Le champ doit contenir uniquement des lettres');
        } else {
          inputField.closest('.formData').setAttribute('data-error-visible', 'false');
          successScore++;
        }
        break;
      case 'email':
        validateEmail(inputField) ? successScore++ : '';
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

    console.log(successScore);
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
  if (e.textLength < n) {
    e.closest('.formData').setAttribute('data-error-visible', 'true');
    e.closest('.formData').setAttribute('data-error', 'Le champ doit contenir au moins 2 caractères');
    return false;
  } else {
    e.closest('.formData').setAttribute('data-error-visible', 'false');
  }
}

// check if the string contains anything other than alphabetical letters
function checkCaracters(e) {
  const regex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  const result = regex.test(e.value);
  if (!result) {
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

// check if the birthdate format is valid
function validateDate(e) {
  const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  const result = regex.test(e.value);
  if (!result) {
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
    e.closest('.formData').setAttribute('data-error', 'Le champ doit contenir un chiffre entre 0 et 100 svp');
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

// Header responsive elements
function editNav() {
  let header = document.getElementById("myTopnav");
    if (header.className === "topnav") {
      header.className += " responsive";
    } else {
      header.className = "topnav";
    }
}

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