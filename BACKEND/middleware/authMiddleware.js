const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // 1. Get token from request header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // 2. Extract the token (remove "Bearer " prefix)
        const token = authHeader.split(" ")[1];

        // 3. Verify it's valid and not expired
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach the userId from token to the request
        req.userId = decoded.userId;

        // 5. Pass control to the actual route handler
        next();

    } catch (error) {
        return res.status(401).json({ message: "Token is not valid or has expired" });
    }
};

module.exports = authMiddleware;