const Admin = require("../model/admin.model");
const upload = require("../middleware/multer")
const path = require("path");
const fs = require("fs")
exports.addAdminPage = async (req, res) => {
    try {

        const data = req.cookies.userData;
        console.log(data);

        if (!data) {
            return res.redirect("/")
        }

        res.render("admin/addAdmin");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};
exports.addAdmin = async (req, res) => {
    try {



        const data = req.body;
        console.log(data.passwrod);

        const USerData = req.cookies.userData;
        console.log(USerData);

        if (!USerData) {
            return res.redirect("/")
        }

        const newAdmin = await Admin.create({
            ...data,
            img: req.file.filename
        });


        console.log("Admin Saved:", newAdmin);
        res.redirect("/admin/view-admin");

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};

exports.addView = async (req, res) => {
    try {
        const data = req.cookies.userData;
        console.log(data);

        if (!data) {
            return res.redirect("/")
        }



        const viewData = await Admin.find();
        res.render("admin/viewAdmin", { viewData })

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};
exports.deleteAdmin = async (req, res) => {
    try {
        const picid = await Admin.findById(req.params.id);
        if (picid && picid.img) {
            var DeleteImg = path.join(__dirname, "../uploads", picid.img)
            console.log(DeleteImg);

            if (fs.existsSync(DeleteImg)) {
                fs.unlinkSync(DeleteImg);
            }
        }
        await Admin.findByIdAndDelete(picid.id);
        console.log(picid.id);
        res.redirect("/admin/view-admin");

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};
exports.editAdminPage = async (req, res) => {
    try {
        const viewData = await Admin.findById(req.params.id);
        // console.log(viewData);

        res.render("admin/editAdmin", { viewData });

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};

exports.Chnage = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        console.log(req);

        let admin = await Admin.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });


        console.log(admin);
        res.redirect("/admin/view-admin");


    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};
