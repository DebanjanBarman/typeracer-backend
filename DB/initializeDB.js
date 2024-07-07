const {pool} = require("./index")

exports.initializeDB = async () => {
    const USER = await pool.query(`
        CREATE TABLE IF NOT EXISTS USER_DETAILS
        (
            NAME     VARCHAR(50),
            ID       UUID PRIMARY KEY,
            EMAIL    VARCHAR(100) UNIQUE,
            PASSWORD VARCHAR(200),
            ROLE     VARCHAR(5) DEFAULT 'user'
        )`);

    if (USER) {
        console.log("USER TABLE CREATED/NOT TOUCHED");
    } else {
        throw new Error("Creation of Tables Failed");
    }
    const GAME = await pool.query(`
        CREATE TABLE IF NOT EXISTS GAME
        (
            ID         UUID PRIMARY KEY,
            START_TIME timestamp,
            PARAGRAPH  VARCHAR(2000),
            NAME       VARCHAR(100),
            ORGANIZER  VARCHAR(100)
        )`);
    if (GAME) {
        console.log("GAME TABLE CREATED/NOT TOUCHED");
    } else {
        throw new Error("Creation of Tables Failed");
    }
    const PERF = await pool.query(`
        CREATE TABLE IF NOT EXISTS PERFORMANCE
        (
            ID         UUID PRIMARY KEY,
            GAME_ID    UUID REFERENCES GAME,
            USER_ID    UUID REFERENCES USER_DETAILS,
            TIME_TAKEN INTEGER
        )`);

    if (PERF) {
        console.log("PERFORMANCE TABLE CREATED/NOT TOUCHED");
    } else {
        throw new Error("Creation of Tables Failed");
    }

    const EVENT = await pool.query(`
        CREATE TABLE IF NOT EXISTS EVENT_DETAILS
        (
            ID          UUID PRIMARY KEY,
            NAME        VARCHAR(50),
            DESCRIPTION VARCHAR(100),
            DATE_FROM   DATE,
            DATE_TO     DATE,
            LOCATION    VARCHAR(100),
            CATEGORY    VARCHAR(20),
            STATUS      VARCHAR(50)
        )`);


    if (EVENT) {
        console.log("EVENT TABLE CREATED/NOT TOUCHED");
    } else {
        throw new Error("Creation of Tables Failed");
    }

    const EVENT_REGISTER = await pool.query(`
        CREATE TABLE IF NOT EXISTS EVENT_REGISTRATIONS
        (
            ID        UUID PRIMARY KEY,
            user_id   uuid REFERENCES USER_DETAILS (ID),
            event_id  uuid REFERENCES EVENT_DETAILS (ID),
            team_name character varying(100),
            status    character varying(50)
        )`);

    if (EVENT_REGISTER) {
        console.log("EVENT_REGISTER TABLE CREATED/NOT TOUCHED");
    } else {
        throw new Error("Creation of Tables Failed");
    }
    return true;
}