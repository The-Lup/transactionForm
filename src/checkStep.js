const checkStep = (step) => {
  document
    .querySelector(`.linea-pasos [data-paso="${step}"] span`)
    .classList.add('linea-pasos__paso-check--checked');
};

export default checkStep;
