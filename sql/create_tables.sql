BEGIN;

DROP TABLE IF EXISTS "user", "sport", "workout", "step", "tag", "goal", "workout_has_step", "workout_has_tag";

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "username_slug" TEXT,
  "email" TEXT,
  "password" TEXT,
  "avatar" TEXT,
  "is_admin" BOOLEAN DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "sport" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "workout" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "date_scheduled" DATE,
  "date_accomplished" DATE,
  "distance" NUMERIC,
  "duration" TEXT,
  "hecho" BOOLEAN DEFAULT false,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "sport_id" INTEGER NOT NULL REFERENCES "sport"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "step" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "distance" NUMERIC,
  "duration" TEXT,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tag" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "goal" (
  "id" SERIAL PRIMARY KEY,
  "activity" NUMERIC,
  "distance" NUMERIC,
  "duration" TEXT,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "workout_has_step" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "workout_id" INTEGER NOT NULL REFERENCES "workout"("id") ON DELETE CASCADE,
  "step_id" INTEGER NOT NULL REFERENCES "step"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "workout_has_tag" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "workout_id" INTEGER NOT NULL REFERENCES "workout"("id") ON DELETE CASCADE,
  "tag_id" INTEGER NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMIT;