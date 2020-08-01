const express = require('express')
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const compression = require('compression');


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


//rutas
app.use("/api/", require("./routes/index"));

//statics files
app.use(express.static(path.join(__dirname, "public"), {maxAge: '1d'}));

app.listen(port, () =>
  console.log("Server on port " + app.get("port"))
);