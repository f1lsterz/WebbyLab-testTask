import UserService from "../services/userService.js";

class UserController {
  async createUser(req, res, next) {
    try {
      const token = await UserService.createUser(req.body);
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
