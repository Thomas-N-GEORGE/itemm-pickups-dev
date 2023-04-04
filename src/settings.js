const stringSettings = [
  {
    "name": "E2",
    "size": 0.6,
    "stripes": false
  },
  {
    "name": "B",
    "size": 1.1,
    "stripes": false
  },
  {
    "name": "G",
    "size": 1.4,
    "stripes": false
  },
  {
    "name": "D",
    "size": 2,
    "stripes": true
  },
  {
    "name": "A",
    "size": 2.4,
    "stripes": true
  },
  {
    "name": "E",
    "size": 2.8,
    "stripes": true
  }
];

const controlSettings = [
  {
    "key": "pickupPosition",
    "defaultValue": 80,
    "label": "Position du micro (mm)",
    "type": "number",
  },
  {
    "key": "selectedNotes",
    "defaultValue": [0,0,0,0,0,0],
    "label": "Notes sélectionnées",
    "type": "array",
  },
  {
    "key": "excitementPosition",
    "defaultValue": 100,
    "label": "Position d'excitation (mm)",
    "type": "number",
  },
  {
    "key": "selectedString",
    "defaultValue": "E",
    "label": "Corde jouée",
    "type": "text",
  },
  {
    "key": "pickupDouble",
    "defaultValue": false,
    "label": "Micro double",
    "type": "bool",
  }
];

export { stringSettings , controlSettings }