import jwt from "jsonwebtoken";

const UserAuth = (req, res, next) => {
    try {
        let token = req.body.authorization || req.headers.authorization;
        // const auth = req.header("Authorization");

        console.log(token);
        if (token[0] === "B") { // Bearer token
            token = token.slice(7, token.length);
        }
        const user_id = jwt.verify(token, process.env.SIGNIN_SECRET);
        console.log("user_id");
        console.log(user_id.id);
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
