import SessionService from "../services/sessionService.js";
import ApiError from "../utils/apiError.js";

class SessionController {
  async createSession(req, res, next) {
    try {
      const { email, password } = req.body;

      const missingFields = {};
      if (!email) missingFields.email = "REQUIRED";
      if (!password) missingFields.password = "REQUIRED";

      if (Object.keys(missingFields).length > 0) {
        throw new ApiError("FORMAT_ERROR", missingFields);
      }

      const token = await SessionService.createSession({
        email,
        password,
      });

      return res.status(200).json({
        token,
        status: 1,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new SessionController();
