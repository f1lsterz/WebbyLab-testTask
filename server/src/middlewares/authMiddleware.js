import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new ApiError("FORMAT_ERROR", { token: "REQUIRED" });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      throw new ApiError("FORMAT_ERROR", { token: "NULL" });
    }

    let decodedData;
    try {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new ApiError("FORMAT_ERROR", { token: "INVALID" });
    }

    req.user = decodedData;
    next();
  } catch (e) {
    next(e);
  }
};

export default authMiddleware;
