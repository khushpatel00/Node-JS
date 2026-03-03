const express = require("express");
const {
    login, dashboard, loginData, logout, forgotPassword, blog, blogDataView, blogDelete, OneBlogView, editBlog, formBlog,
    blogFrom
} = require("../controller/index.controller");

const passport = require("../controller/localStregert");
const upload = require("../middleware/multer");

const routes = express.Router();

routes.get("/", login);

routes.post("/login",
    passport.authenticate("local", { failureRedirect: "/" }),
    loginData
);

routes.get("/dashboard", passport.checkAuthenticate, dashboard);

routes.get("/blog", passport.checkAuthenticate, blog);
routes.post("/blog", passport.checkAuthenticate, upload.single("img"), blogFrom);

routes.get("/ViewBlog", passport.checkAuthenticate, blogDataView);


routes.get("/viewBlogDelete/:id", passport.checkAuthenticate, blogDelete);

routes.get("/editBlog/:id", passport.checkAuthenticate, editBlog);

routes.post("/editBlog/:id", passport.checkAuthenticate, upload.single("img"), formBlog);

routes.get("/OneBlogView/:id", passport.checkAuthenticate, OneBlogView);

routes.get("/logout", logout);
routes.get("/forgotPassword", forgotPassword);

routes.use("/admin", require("./admin.routes"));

module.exports = routes;