const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.use(express.static("public"));
const dbconnect = require("./config/dbconnect")
app.use(express.json())
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const adminSchema = require("./model/admin.model")
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dbconnect();
// body parser middleware (important)
app.use(express.urlencoded({ extended: true }));


// routes
app.use("/", require("./routes/index.routes"));

app.listen(3000, () => {
    console.log("Server start at http://localhost:3000");
});
 //jkhq ecyb ixdu cnby