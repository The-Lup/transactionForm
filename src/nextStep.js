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

export default nextStep;
