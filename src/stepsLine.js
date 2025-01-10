import validateAmount from './validations/validateAmount';
import validateName from './validations/validateName';
import validateMail from './validations/validateMail';

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
