BEGIN;

SET NAMES 'utf8';

INSERT INTO "user"("id", "firstname", "lastname", "email", "password", "role") VALUES
(1, 'Rami', 'Rostom', 'rami@hecho.com', 'hecho', 'admin');

INSERT INTO "sport"("id", "name") VALUES
(1, 'running'),
(2, 'trail'),
(3, 'bike'),
(4, 'swimming');

INSERT INTO "workout"("id", "name", "distance", "duration", "user_id", "sport_id") VALUES
(1, 'sortie longue', 13, 73, 1, 1),
(2, '7 x 1000m', 9, 54, 1, 1);

INSERT INTO "activity"("id", "name", "hecho", "date_scheduled", "date_accomplished", "sport_id", "workout_id", "user_id") VALUES
(1, 'GM to NLS', true, '10/11/2023', '10/11/2023', 1, 1, 1),
(2, 'Fractionné', false, '14/11/2023', null, 1, 2, 1);

INSERT INTO "step"("id", "name", "distance", "duration") VALUES
(1, 'run', 13, 73),
(2, 'run', 1, 4),
(3, 'rest', 0.5, 5),
(4, 'run', 1, 4),
(5, 'rest', 0.5, 5),
(6, 'run', 1, 4),
(7, 'rest', 0.5, 5),
(8, 'run', 1, 4),
(9, 'rest', 0.5, 5),
(10, 'run', 1, 4),
(11, 'rest', 0.5, 5),
(12, 'run', 1, 4),
(13, 'rest', 0.5, 5),
(14, 'run', 1, 4);

INSERT INTO "workout_has_step"("id", "workout_id", "step_id") VALUES
(1, 1, 1),
(2, 2, 2),
(3, 2, 3),
(4, 2, 4),
(5, 2, 5),
(6, 2, 6),
(7, 2, 7),
(8, 2, 8),
(9, 2, 9),
(10, 2, 10),
(11, 2, 11),
(12, 2, 12),
(13, 2, 13),
(14, 2, 14);

COMMIT;