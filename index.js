const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const gameRouter = require("./routes/gameRoutes");
const performanceRouter = require("./routes/performanceRoutes");
const eventRouter = require("./routes/eventRoutes");
const adminRouter = require("./routes/adminRoutes");
const initDB = require("./DB/initializeDB");


const express = require('express');
const http = require('http');
const {initSocket} = require('./socket'); // Import the socket module
const app = express();
const server = http.createServer(app);

initSocket(server);
app.use(express.json());

dotenv.config({path: "./config.env"});
const PORT = process.env.PORT;

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


(async () => {
    const db = await initDB.initializeDB();
    if (db) {
        console.log("DB connected successfully");
    } else {
        console.log(db);
    }
})();


server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
