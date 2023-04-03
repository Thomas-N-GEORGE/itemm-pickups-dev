const plots = require("../plots.json");

export default function compute(inputValues) {
  // À titre d'exemple - Voir le fichier plots.json à la racine du projet
  return plots.data.map(entry => entry + (Math.random() < 0.5 ? -4 : 4));

}