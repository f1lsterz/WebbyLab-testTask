import ApiError from "../utils/apiError.js";

export default function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(500).json(err.toResponse());
  }

  console.log(err);

  res.status(500).json({
    status: 0,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      fields: {},
    },
  });
}
