const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    console.log('authenticateToken')
    console.log(req.headers)
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken
};