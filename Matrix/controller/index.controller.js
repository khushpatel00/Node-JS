const Admin = require("../model/admin.model");
const blog = require("../model/admin.model");
const { addAdmin } = require("./admin.controller");
const cookieParser = require('cookie-parser');
const passwordHash = require('password-hash');
const path = require("path");
const fs = require("fs")

exports.login = async (req, res) => {
    try {
        return res.render("login")
    } catch (error) {
        console.log(error);
        res.redirect("");

    }
}
exports.loginData = async (req, res) => {
    try {
        const { email, password } = req.body

        let admin = await Admin.findOne({ email })

        if (!admin) {
            console.log("admin not found");
            return res.redirect("/");
        }
        if (admin.password !== password) {

            console.log("password rong");
            return res.redirect("/");
        }
        const hashPassword = passwordHash.generate("admin")
        res.cookie("userData", JSON.stringify({
            id: admin._id,
            email: admin.email,
            password: hashPassword,
        }));
        return res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}
exports.dashboard = async (req, res) => {
    try {

        const data = req.cookies.userData;
        console.log(data);

        if (!data) {
            return res.redirect("/")
        }

        return res.render("dashboard")

    } catch (error) {
        console.log(error);
        res.redirect("/");

    }
}

exports.logout = async (req, res) => {
    try {

        res.clearCookie("userData")
        const data = req.cookies.userData;
        console.log(data);
        if (!data) {
            // res.redirect("h")
            console.log("data nahi hai");

        }
        return res.redirect("/")

    } catch (error) {
        console.log(error);
        res.redirect("/");

    }
}

exports.forgotPassword = async (req, res) => {
    try {
        return res.render("./admin/forgotPassoword");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}
exports.blog = async (req, res) => {
    try {
        const searchData = req.query.search;
        const categorySearch = req.query.category;

        let filter = {};
        if (searchData) {
            filter.$or = [
                { title: { $regex: searchData, $options: "i" } },
                { description: { $regex: searchData, $options: "i" } },
                { Category: { $regex: searchData, $options: "i" } },
                { Author: { $regex: searchData, $options: "i" } },
            ];
        }

        if (categorySearch) {
            filter.Category = categorySearch;
        }
        const blogs = await blog.find(filter);

        return res.render("./blog", { blogs });

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}
exports.blogDataView = async (req, res) => {
    try {
        const blogData = req.body
        console.log(blogData);
        console.log("File:", req.file);

        const blogs = await blog.create({
            title: req.body.title,
            description: req.body.description,
            img: req.file.filename,
            Category: req.body.Category,
            Author: req.body.Author,
        });
        return res.redirect("/blog");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}
exports.OneBlogView = async (req, res) => {
    try {
        const blogId = req.params.id;
        const BlogData = await blog.findById(blogId);

        return res.render("OneBlogView", { BlogData });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}


exports.blogDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const blogData = await blog.findById(id);
        if (!blogData) {
            return res.redirect("/blog");
        }
        if (blogData.img) {
            const imagePath = path.join(__dirname, "../uploads/", blogData.img);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await blog.findByIdAndDelete(id);
        return res.redirect("/blog");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};
exports.editBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const EditBlog = await blog.findById(id);
        console.log(EditBlog);

        return res.render("editBlog", { EditBlog });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};
exports.formBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const BlogEditData = req.body;
        if (req.file) {
            BlogEditData.img = req.file.filename
        }
        console.log(BlogEditData);

        await blog.findByIdAndUpdate(id, BlogEditData);

        return res.redirect("/blog");

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};
