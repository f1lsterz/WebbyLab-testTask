import SessionService from "../services/sessionService.js";

class SessionController {
  async createSession(req, res, next) {
    try {
      const token = await SessionService.createSession(req.body);
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
