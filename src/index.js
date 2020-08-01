const express = require('express')
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const compression = require('compression');
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const app = express()

const port = process.env.PORT || 8080;
app.set("port", port);

//dabatase
require("./config/db");
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(compression());
app.use(morgan("dev"));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads/"),
  filename: (req, file, cb, filename) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

app.use(
  multer({
    storage: storage
  }).single("data")
);

//rutas
app.use("/api/", require("./routes/index"));

//statics files
app.use(express.static(path.join(__dirname, "public"), { maxAge: '1d' }));

app.listen(port, () =>
  console.log("Server on port " + app.get("port"))
);