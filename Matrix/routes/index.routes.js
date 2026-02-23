const express =require("express");
const { login, dashboard, loginData, logout, forgotPassword, blog, blogDataView, blogDelete, OneBlogView, editBlog, formBlog  } = require("../controller/index.controller");
const routes = express.Router();
routes.get("/",login)
routes.post("/login",loginData)
routes.get("/dashboard",dashboard)
routes.get("/logout",logout)
routes.get("/blog",blog)
routes.post("/blog",  upload.single("img"),blogDataView)
routes.get("/OneBlogView/:id",OneBlogView)
routes.get("/blogDelete/:id",blogDelete)
routes.get("/editBlog/:id",editBlog)
routes.post("/editBlog/:id",  upload.single("img"),formBlog)
routes.get("/forgotPassword",forgotPassword )
routes.use("/admin",require("./admin.routes"))
module.exports = routes;