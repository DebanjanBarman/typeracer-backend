ALTER USER postgres WITH PASSWORD 'pass1234';
CREATE DATABASE mcalab;

CREATE TABLE IF NOT EXISTS USER_DETAILS
(
    NAME     VARCHAR(50),
    ID       UUID PRIMARY KEY,
    EMAIL    VARCHAR(100) UNIQUE,
    PASSWORD VARCHAR(200),
    ROLE     VARCHAR(5) DEFAULT 'user'
    -- EVENT UUID REFERENCES EVENT_DETAILS DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS GAME
(
    ID         UUID PRIMARY KEY,
    START_TIME timestamp,
    PARAGRAPH  VARCHAR(2000),
    NAME       VARCHAR(100),
    ORGANIZER  VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS PERFORMANCE
(
    ID         UUID PRIMARY KEY,
    GAME_ID    UUID REFERENCES GAME,
    USER_ID    UUID REFERENCES USER_DETAILS,
    TIME_TAKEN INTEGER
);

CREATE TABLE IF NOT EXISTS EVENT_DETAILS
(
    ID             UUID PRIMARY KEY,
    NAME           VARCHAR(50),
    DESCRIPTION    VARCHAR(100),
    DATE_FROM      DATE,
    DATE_TO        DATE,
    LOCATION       VARCHAR(100),
    CATEGORY       VARCHAR(20),
    STATUS         VARCHAR(50)
);
ALTER TABLE USER_DETAILS ADD COLUMN EVENT UUID REFERENCES EVENT_DETAILS DEFAULT NULL;

--
-- SELECT * FROM USER_DETAILS;
-- ALTER TABLE USER_DETAILS ADD COLUMN ROLE VARCHAR(5) DEFAULT 'user';
-- ALTER TABLE USER_DETAILS DROP COLUMN ROLE;