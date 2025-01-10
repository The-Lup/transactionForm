const form = document.getElementById('formulario');

const validateMail = () => {
  //Accepts any email address.
  const regExMail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  //Obtain input
  const inputMail = form['correo-receptor'];

  //Validating name
  if (regExMail.test(inputMail.value)) {
    inputMail.classList.remove('formulario__input--error');
    return true;
  } else {
    inputMail.classList.add('formulario__input--error');
    return false;
  }
};

export default validateMail;
