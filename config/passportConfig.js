const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
    },
    async (email, password, done) => {
        try {
            const findUser = await User.findOne({ email });
            if (!findUser) return done(null, false, { message: "Wrong Email or Password!" });

            const matchedPassword = await bcrypt.compare(password, findUser.password);
            if (!matchedPassword) return done(null, false, { message: "Wrong Email or Password!" });

            done(null, findUser);
        } catch (error) {
            done(error);
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
})
