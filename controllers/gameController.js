const pool = require("../DB/index.js").pool;
const {v4: uuidv4} = require('uuid');
const {broadcastMessage} = require('../socket');


exports.createGame = async (req, res) => {
    const {start_time, paragraph, name, organizer} = req.body;
    const user_id = req.user.id;
    const id = uuidv4();

    if (!start_time || !paragraph || !name || !organizer) {
        return res.status(400).json({
            message: "Please send start time,game name,organizer and paragraph"
        })
    }
    try {
        const result = await pool.query("INSERT INTO GAME(id,start_time,paragraph,name,organizer,created_by) VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [id, start_time, paragraph, name, organizer, user_id]);

        await broadcastMessage("updated")
        return res.status(201).json(result.rows[0])

    } catch (e) {
        console.log(e);
        return res.status(400).json({
            message: "something went wrong"
        })
    }
}

exports.updateGame = async (req, res) => {
    const {start_time, organizer, paragraph, name, id, visible} = req.body;
    if (!start_time || !paragraph || !organizer || !name || !id) {
        return res.status(400).json({
            message: "Please send id, start time, game name,organizer and paragraph"
        })
    }

    try {
        const result = await pool.query("UPDATE GAME SET NAME=$1,START_TIME=$2, PARAGRAPH=$3, ORGANIZER=$4,VISIBLE=$5 WHERE ID=$6 RETURNING *", [name, start_time, paragraph, organizer, visible, id]);
        await broadcastMessage("updated")

        return res.status(200).json(result.rows[0])

    } catch (e) {
        console.log(e);
        return res.status(400).json({
            message: "something went wrong"
        })
    }
}

exports.deleteGame = async (req, res) => {
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({
            message: "Please send id"
        })
    }

    try {
        const result = await pool.query("DELETE FROM GAME WHERE ID=$1  RETURNING *", [id]);
        await broadcastMessage("updated")

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "game not found with this id"
            })
        }
        return res.status(200).json({
            message: "deleted", deleted_id: result.rows[0].id
        })

    } catch (e) {
        console.log(e);
        if (e.code === '22P02') {
            return res.status(400).json({
                message: "Invalid ID"
            })

        }
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
        const result = await pool.query("SELECT * FROM GAME WHERE ID=$1 AND VISIBLE=true", [gameID]);
        return res.status(200).json(result.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(401).json(e);
    }
}
exports.getGames = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM GAME  WHERE VISIBLE=true");
        res.status(200).json(result.rows)
    } catch (e) {
        console.log(e);
        res.status(400).json()
    }
}
exports.getMyGames = async (req, res) => {
    let user_id = req.user.id;
    console.log(user_id)
    try {
        const result = await pool.query("SELECT * FROM GAME WHERE created_by=$1", [user_id]);
        // console.log(result.rows);
        res.status(200).json(result.rows)
    } catch (e) {
        console.log(e);
        res.status(400).json()
    }
}
exports.getMyGame = async (req, res) => {
    const gameID = req.params.id;

    let user_id = req.user.id;
    console.log(user_id)
    try {
        const result = await pool.query("SELECT * FROM GAME WHERE created_by=$1 AND id=$2", [user_id, gameID]);
        // console.log(result.rows);
        res.status(200).json(result.rows[0])
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