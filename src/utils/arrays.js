/**
 * Converti un tableau en objet.
 *
 * @param {array}   array     // tableau (liste d'objets)
 * @param {string}  key       // nom du champ à utiliser comme identifiant
 * @param {string}  field     // (optionnel) nom du champ contenant la valeur de la propriété
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

/**
 * Affiche un tableau de valeurs sous forme d'une chaine de caractères
 * ex: "[0,1,2,3,4,5]"
 * @param {array}     arr
 * @return {string}
 */
const arrayToStr = (arr) => {
  let res = "[";
  // eslint-disable-next-line array-callback-return
  arr.map((elt, key) => {
    if(key < arr.length - 1) {
      res += elt.toString() + ", "
    } else {
      res += elt.toString() + "]"
    }
  })
  return res;
}

export {
  arrayToObj,
  arrayToStr
}