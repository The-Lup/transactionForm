import validateAmount from './validations/validateAmount';
import validateName from './validations/validateName';
import validateMail from './validations/validateMail';
import checkStep from './checkStep';
import nextStep from './nextStep';
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
