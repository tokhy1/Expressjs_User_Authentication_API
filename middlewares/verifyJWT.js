const jwt = require("jsonwebtoken");
const secretKeys = require("../config/secretKeys");

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send("Invalid token format or no token provided!");
    }

    // remove Bearer prefix.
    const tokenWithoutPrefix = token.substring(7)

    jwt.verify(
        tokenWithoutPrefix,
        secretKeys.jwtSecretKey,
        (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).send("Failed to verify token!");
            }

            req.user = decoded;
            next();
        }
    );
};

module.exports = verifyToken;