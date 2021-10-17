const AuthService = require("../services/AuthService");

const checkToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = AuthService.decode(token);
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).send({message: "Unable to authenticate user"})
    }
}

module.exports = {
    checkToken: checkToken
}