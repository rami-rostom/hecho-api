BEGIN;

SET NAMES 'utf8';

INSERT INTO "user"("username", "username_slug", "email", "password", "avatar", "is_admin") VALUES
('Ramirez', 'ramirez', 'ramirez@hecho.io', '$2b$10$YS/ySLwsWHcpzaGpGXD1lu8JbQKUa.DAw8O52boID9EwmdlNWoG3K', null, false);

INSERT INTO "sport"("name") VALUES
('running'),
('trail'),
('bike'),
('swimming'),
('hiking');

INSERT INTO "workout"("name", "date_scheduled", "date_accomplished", "distance", "duration", "pace", "hecho", "user_id", "sport_id") VALUES
('Sortie longue', '2023/12/26', '2023/12/26', 12, 60, 5, true, 1, 1),
('Fractionné', '2023/12/28', '2023/12/28', 12, 60, 5, true, 1, 1);

INSERT INTO "step"("name", "distance", "duration", "user_id") VALUES
('run', 12, 60, 1),
('run', 1, 4, 1),
('rest', 0.5, 5, 1);

INSERT INTO "tag"("name", "user_id") VALUES
('footing', 1),
('fractionné', 1);

INSERT INTO "workout_has_step"("workout_id", "step_id") VALUES
(1, 1),
(2, 2),
(2, 3);

INSERT INTO "workout_has_tag"("workout_id", "tag_id") VALUES
(1, 1),
(2, 2);

COMMIT;