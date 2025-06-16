import UserService from "../services/userService.js";
import ApiError from "../utils/apiError.js";

class UserController {
  async createUser(req, res, next) {
    try {
      const { email, name, password, confirmPassword } = req.body;

      const missingFields = {};
      if (!email) missingFields.email = "REQUIRED";
      if (!name) missingFields.name = "REQUIRED";
      if (!password) missingFields.password = "REQUIRED";
      if (!confirmPassword) missingFields.confirmPassword = "REQUIRED";

      if (Object.keys(missingFields).length > 0) {
        throw new ApiError("FORMAT_ERROR", missingFields);
      }

      const token = await UserService.createUser({
        email,
        name,
        password,
        confirmPassword,
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

export default new UserController();
