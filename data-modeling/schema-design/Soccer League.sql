-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/a8rDeC
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "Teams" (
    "id" int   NOT NULL,
    "name" text   NOT NULL,
    "coach" text   NOT NULL,
    CONSTRAINT "pk_Teams" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Players" (
    "id" int   NOT NULL,
    "name" text   NOT NULL,
    "team_id" int   NOT NULL,
    CONSTRAINT "pk_Players" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Referees" (
    "id" int   NOT NULL,
    "name" text   NOT NULL,
    CONSTRAINT "pk_Referees" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Matches" (
    "id" int   NOT NULL,
    "teamA_id" int   NOT NULL,
    "teamB_id" int   NOT NULL,
    "referee_id" int   NOT NULL,
    "match_date" date   NOT NULL,
    "start_time" time   NOT NULL,
    CONSTRAINT "pk_Matches" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Goals" (
    "id" int   NOT NULL,
    "match_id" int   NOT NULL,
    "player_id" int   NOT NULL,
    CONSTRAINT "pk_Goals" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Score" (
    "team_id" int   NOT NULL,
    "match_id" int   NOT NULL,
    "result" text   NOT NULL,
    CONSTRAINT "pk_Score" PRIMARY KEY (
        "team_id","match_id"
     )
);

CREATE TABLE "League" (
    "id" int   NOT NULL,
    "team_id" int   NOT NULL,
    "points" int   NOT NULL,
    "start_date" date   NOT NULL,
    "end_date" date   NOT NULL,
    CONSTRAINT "pk_League" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "Players" ADD CONSTRAINT "fk_Players_team_id" FOREIGN KEY("team_id")
REFERENCES "Teams" ("id");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_teamA_id" FOREIGN KEY("teamA_id")
REFERENCES "Teams" ("id");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_teamB_id" FOREIGN KEY("teamB_id")
REFERENCES "Teams" ("id");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_referee_id" FOREIGN KEY("referee_id")
REFERENCES "Referees" ("id");

ALTER TABLE "Goals" ADD CONSTRAINT "fk_Goals_match_id" FOREIGN KEY("match_id")
REFERENCES "Matches" ("id");

ALTER TABLE "Goals" ADD CONSTRAINT "fk_Goals_player_id" FOREIGN KEY("player_id")
REFERENCES "Players" ("id");

ALTER TABLE "Score" ADD CONSTRAINT "fk_Score_team_id" FOREIGN KEY("team_id")
REFERENCES "Teams" ("id");

ALTER TABLE "Score" ADD CONSTRAINT "fk_Score_match_id" FOREIGN KEY("match_id")
REFERENCES "Matches" ("id");

ALTER TABLE "League" ADD CONSTRAINT "fk_League_team_id" FOREIGN KEY("team_id")
REFERENCES "Teams" ("id");

