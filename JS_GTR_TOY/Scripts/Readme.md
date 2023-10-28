# Notes - questions sur les fichiers de scripts JS de Guitar Toy.


## guitare.js

 - C'est dans ce fichier que se font les calculs de *filtrage audio* en fonction des paramètres, à priori.
 - Classes : ``Instrument``, ``Micro``, ``Corde``. Un instrument est construit avec 6 cordes et 1 micro "Fender".
 - Le fichier ui.js va appeler les méthodes des classes `Instrument` et `Corde` (Pas `Micro`, à priori), comme `Corde.pluck()` par exemple.
 - Le fichier *audio.js* appelle la méthode ``Instrument.output()``.

 ### Questions sur ce fichier : 

  - Éclaircissements sur les paramètres et méthodes de la classe Corde : 
    - c'est ici le centre des calculs ? 
    - j'ai besoin d'ajouter des commentaires afin de m'y retrouver, c'est pas hyper clair.
    - Romain ou Jérémy reconnaîtront sans doute le type d'opération dont il s'agit.


## Le son ?

 - La Web Audio API ou "context" audio doit être instancié avec AudioContext().
  - Il y a un système de flux entrée --> traitement(s) --> sortie appelé "audio routing graph". C'est du "Modular Routing" au travers de "audio nodes".
  - On utilise la méthode connect() pour diriger le flux d'un audio node à un autre.


## audio.js

 - Les fonctions ``audioStart()`` et ``audioStop()`` semblent gérer : 
    - l'initialisation de l'instrument : ``init(inst)``
    - appelées de ui.js, gèrent l'affichage du switch "on/off".
 - ``audioCtx.createConvolver()``  : cf Web Audio API : https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API 
 - À étudier avec draw.js qui contient quelques-unes des fonctions appelées.
 - Des modules JS audio et leurs fonctions semblent dépréciées ; il va falloir les remplacer avec autre chose, voir la doc MDN.

  - Le spectre affiché doit être calculé si possible sur les premières 500ms.
  - Se limiter en dessous de 5-6kHz
