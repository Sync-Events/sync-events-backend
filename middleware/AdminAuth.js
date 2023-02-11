import jwt from "jsonwebtoken";

const UserAuth = (req, res, next) => {
    try {
        let token = req.body.authorization || req.headers.authorization;
        if (token[0] === "B") { // Bearer token
            token = token.slice(7, token.length);
        }
        const user = jwt.verify(token, process.env.SIGNIN_SECRET);
        if (!user.id || user.userType !== "Admin") {
            res.status(401).json({ message: "Only Admin can call this" });
        }
        req.id = user.id;
        next();
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export default UserAuth;
