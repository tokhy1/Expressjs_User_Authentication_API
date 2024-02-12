const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const secretKeys = require('./config/secretKeys');
const passport = require("passport");
const MongoStore = require('connect-mongo');
const cors = require('cors');
const verifyToken = require('./middlewares/verifyJWT');

const app = express();

app.use(express.json());
app.use(cors());

// database connection
const connectDB = require("./config/dbConnection");
connectDB();
const db = mongoose.connection;

// session configuration
app.use(
    session(
        {
            secret: secretKeys.sessionSecretKey,
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                client: mongoose.connection.getClient()
            }),
        }
    )
)

// passport configuration
require('./config/passportConfig');

// passport middleware initialization
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', require("./routes/auth/authRoutes"));
app.use(verifyToken);


db.once('open', () => {
    console.log('Connected to DB!');
    app.listen(3500, () => console.log(`Server running on http://localhost:3500`));
});