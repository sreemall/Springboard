-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/a8rDeC
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "Doctors" (
    "id" int   NOT NULL,
    "name" string   NOT NULL,
    "specialty" string   NOT NULL,
    CONSTRAINT "pk_Doctors" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Patients" (
    "id" int   NOT NULL,
    "name" string   NOT NULL,
    "dob" date   NOT NULL,
    "insurance" string   NOT NULL,
    CONSTRAINT "pk_Patients" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Visits" (
    "id" int   NOT NULL,
    "patient_id" int   NOT NULL,
    "doc_id" int   NOT NULL,
    "service_date" date   NOT NULL,
    "diagnose_id" int   NOT NULL,
    CONSTRAINT "pk_Visits" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_Visits_diagnose_id" UNIQUE (
        "diagnose_id"
    )
);

CREATE TABLE "Diagnoses" (
    "id" int   NOT NULL,
    -- visit_id int UNIQUE FK >- Visits.id
    -- Field documentation comment 3
    "notes" string   NOT NULL,
    "disease_id" id   NOT NULL,
    CONSTRAINT "pk_Diagnoses" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "Diseases" (
    "id" int   NOT NULL,
    "name" string   NOT NULL,
    "description" string   NOT NULL,
    CONSTRAINT "pk_Diseases" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "Visits" ADD CONSTRAINT "fk_Visits_patient_id" FOREIGN KEY("patient_id")
REFERENCES "Patients" ("id");

ALTER TABLE "Visits" ADD CONSTRAINT "fk_Visits_doc_id" FOREIGN KEY("doc_id")
REFERENCES "Doctors" ("id");

ALTER TABLE "Visits" ADD CONSTRAINT "fk_Visits_diagnose_id" FOREIGN KEY("diagnose_id")
REFERENCES "Diagnoses" ("id");

ALTER TABLE "Diagnoses" ADD CONSTRAINT "fk_Diagnoses_disease_id" FOREIGN KEY("disease_id")
REFERENCES "Diseases" ("id");

