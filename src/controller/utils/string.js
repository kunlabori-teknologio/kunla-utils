const plurar = require("pluralize");

/**
 * Converts the given text to PascalCase.
 *
 * @param {string} text - The input text to be converted.
 * @returns {string} - The converted text in PascalCase.
 */
const pascalfy = (text) => {
  let textArray = text.split(' ');
  textArray.forEach((term, termIndex) => {
    textArray[termIndex] = capitalization(term);
  })

  const pascalCase = textArray.join('');

  return pascalCase;
}

/**
 * Converts the given text to kebab-case.
 *
 * @param {string} text - The input text to be converted.
 * @returns {string} - The converted text in kebab-case.
 */
const kebabfy = (text) => {
  const kebabCase = text
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter;
    })
    .join('');
  return kebabCase;
}

/**
 * Pluralizes the given text using the "pluralize" library.
 *
 * @param {string} text - The input text to be pluralized.
 * @returns {string} - The pluralized version of the input text.
 */
const plurarize = (text) => {
  return plurar(text);
}

/**
 * Singularizes the given text using the "pluralize" library.
 *
 * @param {string} text - The input text to be singularized.
 * @returns {string} - The singularized version of the input text.
 */
const singularize = (text) => {
  return plurar.singular(text);
}

/**
 * Capitalizes the first letter of the given term.
 *
 * @param {string} term - The input term to be capitalized.
 * @returns {string} - The term with its first letter capitalized.
 */
const capitalization = (term) => {
  return term
    .replace(/([A-Z])/g, '$1')
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });
}

const setIdToPropertyName = (text) => {
  let propertyName = '';
  const array = id.split('-');
  propertyName += array[0].toLowerCase();
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    if (i > 0)
      propertyName += element.charAt(0).toUpperCase() + element.slice(1);
  }

  return propertyName;
}

module.exports = {
  pascalfy,
  kebabfy,
  plurarize,
  singularize,
  setIdToPropertyName
}