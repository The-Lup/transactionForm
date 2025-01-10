'use strict';

const form$3 = document.getElementById('formulario');

const validateAmount = () => {
  //Accepts any digit (0–9) and decimals (optional).
  const regExQuantity = /^\d+(\.\d+)?$/;

  //Obtain input
  const inputQuantity = form$3.cantidad;

  //Validating quantity
  if (regExQuantity.test(inputQuantity.value)) {
    inputQuantity.classList.remove('formulario__input--error');
    return true;
  } else {
    inputQuantity.classList.add('formulario__input--error');
    return false;
  }
};

const form$2 = document.getElementById('formulario');

const validateName = () => {
  //Accepts normal and accented names (optional).
  const regExName = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

  //Obtain input
  const inputName = form$2['nombre-receptor'];

  //Validating name
  if (regExName.test(inputName.value)) {
    inputName.classList.remove('formulario__input--error');
    return true;
  } else {
    inputName.classList.add('formulario__input--error');
    return false;
  }
};

const form$1 = document.getElementById('formulario');

const validateMail = () => {
  //Accepts any email address.
  const regExMail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  //Obtain input
  const inputMail = form$1['correo-receptor'];

  //Validating name
  if (regExMail.test(inputMail.value)) {
    inputMail.classList.remove('formulario__input--error');
    return true;
  } else {
    inputMail.classList.add('formulario__input--error');
    return false;
  }
};

const checkStep = (step) => {
  document
    .querySelector(`.linea-pasos [data-paso="${step}"] span`)
    .classList.add('linea-pasos__paso-check--checked');
};

const nextStep = () => {
  //making an array with all elements
  const steps = [...document.querySelectorAll('.linea-pasos__paso')];

  //Obtaining active step.
  const activeStep = document
    .querySelector('.linea-pasos__paso-check--active')
    .closest('.linea-pasos__paso');

  //Index active step.
  const activeStepIndex = steps.indexOf(activeStep);

  if (activeStepIndex < steps.length - 1) {
    //Removing active class from activeStep.
    activeStep
      .querySelector('span')
      .classList.remove('linea-pasos__paso-check--active');

    //moving to next element and adding the class linea-pasos__paso-check--active again.
    steps[activeStepIndex + 1]
      .querySelector('span')
      .classList.add('linea-pasos__paso-check--active');

    const id = steps[activeStepIndex + 1].dataset.paso;
    document
      .querySelector(`.formulario__body [data-paso="${id}"]`)
      .scrollIntoView({
        inline: 'start',
        behavior: 'smooth',
      });
  }
};

const form = document.getElementById('formulario');

//Restarting scroll
form.querySelector('.formulario__body').scrollLeft = 0;

//Event listener to check form fields when the user makes corrections.
form.addEventListener('keyup', (e) => {
  if (e.target.tagName === 'INPUT') {
    if (e.target.id === 'cantidad') {
      validateAmount();
    } else if (e.target.id === 'nombre-receptor') {
      validateName();
    } else if (e.target.id === 'correo-receptor') {
      validateMail();
    }
  }
});

const btnNext = document.getElementById('formulario__btn');
btnNext.addEventListener('click', (e) => {
  e.preventDefault();

  const actualStep = document
    .querySelector('.linea-pasos__paso-check--active')
    .closest('.linea-pasos__paso').dataset.paso;
  if (actualStep === 'cantidad') {
    if (validateAmount()) {
      checkStep('cantidad');
      nextStep();
    }
  } else if (actualStep === 'datos') {
    if (validateName() && validateMail()) {
      checkStep('datos');
      nextStep();
    }
  } else if (actualStep === 'metodo') {
    checkStep('metodo');

    //Coin format
    const options = { style: 'currency', currency: 'USD' };
    const coinFormat = new Intl.NumberFormat('en-US', options);

    document.querySelector('[data-valor="cantidad"] span').innerText =
      coinFormat.format(formulario.cantidad.value);

    document.querySelector('[data-valor="nombre-receptor"] span').innerText =
      formulario['nombre-receptor'].value;

    document.querySelector('[data-valor="correo-receptor"] span').innerText =
      formulario['correo-receptor'].value;

    document.querySelector('[data-valor="metodo"] span').innerText =
      formulario.metodo.value;

    //Changing text boton to "Transfer"
    btnNext.querySelector('span').innerHTML = 'Transferir';

    //disabling next boton
    btnNext.classList.add('formulario__btn--disabled');

    //hidding next icon
    btnNext
      .querySelector('[data-icono="siguiente"]')
      .classList.remove('formulario__btn-contenedor-icono--active');

    //Adding bank icon
    btnNext
      .querySelector('[data-icono="banco"]')
      .classList.add('formulario__btn-contenedor-icono--active');

    nextStep();

    //enabling boton after 4secs
    setTimeout(() => {
      btnNext.classList.remove('formulario__btn--disabled');
    }, 4000);
  } else if (
    actualStep === 'confirmacion' &&
    !btnNext.matches('.formulario__btn--disabled')
  ) {
    //Here would go the code for the server request, a redirection, etc.
    //but there isn't a server :'D

    //Changing text instead of Transferir to Transfiriendo after click
    btnNext.querySelector('span').innerText = 'Transfiriendo';

    //Disabling boton again to prevent missclicks
    btnNext.classList.add('formulario__btn--disabled');

    setTimeout(() => {
      formulario.classList.add('formulario--hidden');
      document.getElementById('alerta').classList.add('alerta--active');
    }, 4000);
  }
});

const line = document.getElementById('linea-pasos');
line.addEventListener('click', (e) => {
  if (!e.target.closest('.linea-pasos__paso')) return;

  const activeStep = document
    .querySelector('.linea-pasos__paso-check--active')
    .closest('.linea-pasos__paso').dataset.paso;

  //Validating active step
  if (activeStep === 'cantidad') {
    if (!validateAmount()) return;
  } else if (activeStep === 'datos') {
    if (!validateName() || !validateMail()) return;
  }

  //Getting the step we want to navigate to
  const navStep = e.target.closest('.linea-pasos__paso');

  /*
  We check if the step we want to navigate to has the "checked" symbol; 
  we only want to click on those that have it.
  */

  if (navStep.querySelector('.linea-pasos__paso-check--checked')) {
    const activeStep = line.querySelector('.linea-pasos__paso-check--active');
    activeStep.classList.remove('linea-pasos__paso-check--active');

    //getting the identificator
    const id = navStep.dataset.paso;

    //adding active class to actual step in line
    line
      .querySelector(`[data-paso="${id}"] span`)
      .classList.add('linea-pasos__paso-check--active');

    //changing text boton
    const btnForm = document.querySelector('#formulario__btn');
    btnForm.querySelector('span').innerText = 'Siguiente';

    //Removing and adding icons
    btnForm
      .querySelector('[data-icono="banco"]')
      .classList.remove('formulario__btn-contenedor-icono--active');

    btnForm
      .querySelector('[data-icono="siguiente"]')
      .classList.add('formulario__btn-contenedor-icono--active');

    //removing disables class when u select a previous form
    btnForm.classList.remove('formulario__btn--disabled');

    //navigating to the actual step
    document
      .querySelector(`.formulario__body [data-paso="${id}"]`)
      .scrollIntoView({
        inline: 'start',
        behavior: 'smooth',
      });
  }
});
//# sourceMappingURL=bundle.js.map
