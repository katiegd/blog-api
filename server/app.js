const express = require("express");
const indexRouter = require("./routes/index.js");
const path = require("node:path");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Need to set up authentication middleware with jwt and passport

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
