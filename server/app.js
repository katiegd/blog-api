const express = require("express");
const indexRouter = require("./routes/index.js");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

const corsOptions = {
  origin: ["https://blog-api-lqan.onrender.com/"], //Front end port
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
