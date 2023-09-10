# Notes - questions sur les fichiers de scripts JS de Guitar Toy.

## guitare.js

 - C'est dans ce fichier que se font les calculs de *filtrage audio* en fonction des paramètres, à priori.
 - Classes : ``Instrument``, ``Micro``, ``Corde``. Un instrument est construit avec 6 cordes et 1 micro "Fender".
 - Le fichier ui.js va appeler les méthodes des classes `Instrument` et `Corde` (Pas `Micro`, à priori), comme `Corde.pluck()` par exemple.
 - Le fichier *audio.js* appelle la méthode ``Instrument.output()``.

## Le son ?

 - Je n'ai pas encore compris comment était produit le son.