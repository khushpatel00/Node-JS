const express = require("express");
const { addAdminPage, addAdmin, addView, deleteAdmin, editAdminPage, Chnage } = require("../controller/admin.controller");
const upload = require("../middleware/multer");  
const passport = require("../controller/localStregert");

const routes = express.Router();
routes.get("/add-admin", passport.checkAuthenticate, addAdminPage)
routes.post("/add-admin", upload.single("img"), addAdmin)
routes.get("/view-Admin", passport.checkAuthenticate, addView)
routes.get("/delete/:id", deleteAdmin);
routes.get("/edit/:id", editAdminPage);

routes.post("/edit/:id", passport.checkAuthenticate, Chnage);


module.exports = routes;