const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const gameRouter = require("./routes/gameRoutes");
const performanceRouter = require("./routes/performanceRoutes");
const eventRouter = require("./routes/eventRoutes");
const adminRouter = require("./routes/adminRoutes");
const initDB = require("./DB/initializeDB");
const {Server} = require("socket.io");
const {init} = require('./socket');
const {createServer} = require('http');

const app = express();
const server = createServer(app);
const io = init(server)

dotenv.config({path: "./config.env"});
const PORT = process.env.PORT;

app.use(express.json({limit: "100kb"}));
app.use(cors({origin: "*", exposedHeaders: "Content-Range"}));

app.options("/", cors());

app.use("/api/users", userRouter);
app.use("/api/games", gameRouter);
app.use("/api/performance", performanceRouter);
app.use("/api/event", eventRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
    res.send("working");
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    // socket.emit("quiz_updated", {data: "Fetch the quizzes data again"})
    socket.broadcast.emit("game_updated", {data: "fetch the game_updated data again"})
    socket.on("game_updated", (arg) => {
        console.log(arg);
    });
});

(async () => {
    const db = await initDB.initializeDB();
    if (db) {
        console.log("DB connected successfully");
    } else {
        console.log(db);
    }
})();


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
