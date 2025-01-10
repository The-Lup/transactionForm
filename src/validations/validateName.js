const form = document.getElementById('formulario');

const validateName = () => {
  //Accepts normal and accented names (optional).
  const regExName = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

  //Obtain input
  const inputName = form['nombre-receptor'];

  //Validating name
  if (regExName.test(inputName.value)) {
    inputName.classList.remove('formulario__input--error');
    return true;
  } else {
    inputName.classList.add('formulario__input--error');
    return false;
  }
};

export default validateName;
