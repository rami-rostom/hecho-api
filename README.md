# Hecho - API

## Présentation

Hecho, une plateforme axée sur l'accomplissement d'activités physiques et sportives.

Le plus important n'est pas la performance mais d'accomplir les activités programmées, que ce soit **HECHO** !

## Back-end

L'API est structurée pour respecter l'architecture REST.

La stack de l'application côté back-end :
- Nodejs
- Express
- Postgres SQL
- Sequelize

## Front-end

La partie front-end sera réalisée avec React.

## Éléments de langage Hecho

- **activité** = activité physique/sportive recensant les informations globales comme la date, le sport, la réalisation, etc.
- **Hecho** = indiquer si une activité a été réalisé (hecho = "fait" en espagnol).
- **sport** = type d'activité sportive. Exemple : running, trail, vélo, natation.
- **entraînement** = description plus spécifique de l'activité (**dépendant d'une activité**). Recense les infos comme la durée et la distance.
- **étape** = les étapes constituent le contenu de l'entraînement. Il peut y avoir une ou plusieurs étapes dans un entraînement. Exemple d'étapes dans le cas du running : échauffement, course, récupération, repos, etc. Une étape est consitutée d'une distance et d'une durée (**dépendant d'un entraînement**).
