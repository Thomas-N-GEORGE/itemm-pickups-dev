/**
 * Converti un tableau en objet.
 *
 * @param array               // tableau (liste d'objets)
 * @param key                 // nom du champ à utiliser comme identifiant
 * @param {string} field      // (optionnel) nom du champ contenant la valeur de la propriété
 * @return {*}
 */
const arrayToObj = (array, key, field) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: field ? item[field] : item,
    };
  }, initialValue);
};


export {
  arrayToObj
}