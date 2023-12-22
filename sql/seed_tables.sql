BEGIN;

SET NAMES 'utf8';

INSERT INTO "user"("username", "username_slug", "email", "password", "avatar", "isAdmin") VALUES
('Ramirez', 'ramirez', 'ramirez@hecho.io', '$2b$10$YS/ySLwsWHcpzaGpGXD1lu8JbQKUa.DAw8O52boID9EwmdlNWoG3K', null, false);

INSERT INTO "sport"("name") VALUES
('running'),
('trail'),
('bike'),
('swimming');

INSERT INTO "workout"("name", "distance", "duration", "user_id", "sport_id") VALUES
('sortie longue', 13, 73, 1, 1),
('7 x 1000m', 9, 54, 1, 1);

INSERT INTO "activity"("name", "hecho", "date_scheduled", "date_accomplished", "sport_id", "workout_id", "user_id") VALUES
('GM to NLS', true, '10/11/2023', '10/11/2023', 1, 1, 1),
('Fractionné', false, '14/11/2023', null, 1, 2, 1);

INSERT INTO "step"("name", "distance", "duration") VALUES
('run', 13, 73),
('run', 1, 4),
('rest', 0.5, 5),
('run', 1, 4),
('rest', 0.5, 5),
('run', 1, 4),
('rest', 0.5, 5),
('run', 1, 4),
('rest', 0.5, 5),
('run', 1, 4),
('rest', 0.5, 5),
('run', 1, 4),
('rest', 0.5, 5),
('run', 1, 4);

INSERT INTO "workout_has_step"("workout_id", "step_id") VALUES
(1, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14);

COMMIT;