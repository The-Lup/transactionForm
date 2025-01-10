const form = document.getElementById('formulario');

const validateAmount = () => {
  //Accepts any digit (0–9) and decimals (optional).
  const regExQuantity = /^\d+(\.\d+)?$/;

  //Obtain input
  const inputQuantity = form.cantidad;

  //Validating quantity
  if (regExQuantity.test(inputQuantity.value)) {
    inputQuantity.classList.remove('formulario__input--error');
    return true;
  } else {
    inputQuantity.classList.add('formulario__input--error');
    return false;
  }
};

export default validateAmount;
