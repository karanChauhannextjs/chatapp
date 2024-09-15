import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token, "token");

    if (!token) {
      return res.status(401).json({ message: "user not authorized." });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRETKEY);
    console.log(decode, "decode");
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.id = decode.userID;
    next();
  } catch (error) {
    console.log(error, "error");
  }
};
