const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../model/admin.model");
const bcrypt = require("bcrypt");

passport.use(new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        try {
            const admin = await Admin.findOne({ email: email.trim() });

            if (!admin) {
                console.log("Admin not found");
                return done(null, false);
            }

            const match = await bcrypt.compare(password, admin.password);
            console.log(password);
            console.log(admin.password);
            

            if (!match) {
                console.log("Password incorrect");
                return done(null, false);
            }

            return done(null, admin);
        } catch (error) {
            return done(error);
        }
    }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
    try {
        const admin = await Admin.findById(id);
        done(null, admin);
    } catch (error) {
        done(error, null);
    }
});


passport.checkAuthenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/");
};

module.exports = passport;