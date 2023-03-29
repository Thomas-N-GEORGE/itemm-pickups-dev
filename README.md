# Itemm Pickups

Le fichier devant contenir les algorithmes permetant de générer le signal est `src/functions/computes.js`. 

La fonction principale du fichier (compute) est appelée à chaque fois qu'une modification est faite sur un des controls de l'application.

Le paramètre `inputValues` est un objet ayant les propriétés suivantes:

| propriété          | type                          | description                              |
|--------------------|-------------------------------|------------------------------------------|
| excitementPosition | number                        | Endroit où la corde est attaquée         |
| pickupPosition     | number                        | Position du micro                        |
| pickupType         | string ("simple" ou "double") | Type du micro                            |
| selectedString     | string                        | Corde jouée ('E', 'A', ...)              |
| stringLength       | number                        | Longueur de la corde. Relatif à la jouée |


Cette fonction doit idéalement retourner un tableau de nombre qui servira à l'affichage de la courbe de fréquence.
