export const aliasValidator = (input) => {
  const errors = {};
  let aliasRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!input.trim()) {
    errors.alias = "Ingresa un alias";
  } else if (!aliasRegex.test(input.trim())) {
    errors.alias = "El campo alias solo acepta letras y espacios en blanco";
  } else if (input.length < 4) {
    errors.alias = "El campo alias debe tener minimo 4 caracteres";
  } else if (input.length > 6) {
    errors.alias = "El campo alias debe tener maximo 6 caracteres";
  }

  return errors;
};

export const roomValidator = (input) => {
  const errors = {};
  let roomRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!input.trim()) {
    errors.room = "Ingresa una sala";
  } else if (!roomRegex.test(input.trim())) {
    errors.room = "El campo sala solo acepta letras y espacios en blanco";
  } else if (input.length < 4) {
    errors.room = "El campo sala debe tener minimo 4 caracteres";
  } else if (input.length > 6) {
    errors.room = "El campo sala debe tener maximo 6 caracteres";
  }

  return errors;
};

export const playersValidator = (input) => {
  const errors = {};
  let playersRegex = /^[0-9]+$/;

  if (!input.trim()) {
    errors.players = "Ingresa la cantidad de jugadores";
  } else if (!playersRegex.test(input.trim())) {
    errors.players = "El campo jugadores solo acepta números";
  } else {
    const num = parseInt(input, 10);
    if (num < 2 || num > 15) {
      errors.players =
        "El valor debe estar entre 2 y 15 para la cantidad de jugadores";
    }
  }

  return errors;
};

export const shotValidator = (input) => {
  const errors = {};
  let shotRegex = /^[0-9]+$/;

  if (!input.trim()) {
    errors.shot = "Ingresa el numero mas cercano";
  } else if (!shotRegex.test(input.trim())) {
    errors.shot = "El campo tiro solo acepta números";
  } else {
    const num = parseInt(input, 10);
    if (num < 1 || num > 100) {
      errors.shot = "El valor del tiro debe estar entre 1 y 100";
    }
  }

  return errors;
};
