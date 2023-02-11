import jwt from "jsonwebtoken";

const UserAuth = (req, res, next) => {
    try {
        let token = req.body.authorization || req.headers.authorization;
        if (token[0] === "B") { // Bearer token
            token = token.slice(7, token.length);
        }
        const user_id = jwt.verify(token, process.env.SIGNIN_SECRET);
        if (!user_id.id) {
            res.status(401).json({ message: "user not logged in" });
        }
        req.id = user_id.id;
        next();
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export default UserAuth;
