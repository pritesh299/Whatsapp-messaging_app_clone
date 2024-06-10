import jwt from "jsonwebtoken";
const TokenAuth = (req, res, next) => {
    const secret = process.env.JWT_SECRET || "";
    if (secret === "") {
        console.log("ERROR: Secret is undefined, please check your JWT secret");
        return res.status(500).json({ message: "Server error" });
    }
    let token = req.body.token || " ";
    /*   token=token.split(" ")[1].trim() */
    if (!token || token === " ") {
        console.log("ERROR: No token provided");
        req.body = { userData: req.body.userData, tokenAuthenticated: false };
    }
    else
        (jwt.verify(token, secret, (err, decodedData) => {
            if (err) {
                console.log("ERROR: Could not connect to the protected route");
                console.log({ message: "Token is not valid" });
            }
            console.log('SUCCESS: Connected to protected route');
            req.body = { userData: decodedData, tokenAuthenticated: true };
        }));
    next();
};
export default TokenAuth;
