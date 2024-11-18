const express = require("express");
const indexRouter = require("./routes/index.js");
const cors = require("cors");

require("dotenv").config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"], //Front end port
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
