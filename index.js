const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const gameRouter = require("./routes/gameRoutes");
const performanceRouter = require("./routes/performanceRoutes");
const eventRouter = require("./routes/eventRoutes");

const app = express();
const PORT = 3000;
dotenv.config({ path: "./config.env" });

app.use(express.json({ limit: "100kb" }));
app.use(cors({ origin: "*", exposedHeaders: "Content-Range" }));

app.options("/", cors());

app.use("/api/users", userRouter);
app.use("/api/games", gameRouter);
app.use("/api/performance", performanceRouter);
app.use("/api/event", eventRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
