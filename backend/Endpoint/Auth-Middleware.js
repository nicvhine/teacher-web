const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.d0b5feeacfec370cef52f5a87597ed14f463537703a61011585d7d18cc59d21f, (err, user) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken
};