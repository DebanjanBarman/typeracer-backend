const pool = require("../DB/index.js").pool;
const {v4: uuidv4} = require('uuid');

exports.createGame = async (req, res) => {
    const {start_time, paragraph, name} = req.body;
    const id = uuidv4();

    if (!start_time || !paragraph || !name) {
        return res.status(400).json({
            message: "Please send start time and paragraph"
        })
    }
    try {
        const result = await pool.query("INSERT INTO GAME(id,start_time,paragraph,name) VALUES($1,$2,$3,$4) RETURNING *", [id, start_time, paragraph, name]);
        return res.status(201).json(result.rows[0])

    } catch (e) {
        console.log(e);
        return res.status(400).json({
            message: "something went wrong"
        })
    }
}

exports.getGame = async (req, res) => {
    const gameID = req.params.id;
    if (!gameID) {
        return res.status(400).json({
            message: "Please specify the id"
        })
    }

    try {
        const result = await pool.query("SELECT * FROM GAME WHERE ID=$1", [gameID]);

        return res.status(200).json(result.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(401).json(e);
    }
}
exports.getGames = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM GAME ORDER BY START_TIME");
        res.status(200).json(result.rows)
    } catch (e) {
        console.log(e);
        res.status(400).json()
    }
}

exports.checkParticipation = async (req, res) => {
    const {game, user} = req.query;

    try {
        const result = await pool.query("SELECT * FROM PERFORMANCE WHERE GAME_ID=$1 and USER_ID=$2", [game, user]);

        res.status(200).json(result.rows.length)
    } catch (e) {
        console.log(e);
        res.status(400).json()
    }


}