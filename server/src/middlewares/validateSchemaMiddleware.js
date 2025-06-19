import ApiError from "../utils/apiError.js";

export default function validateSchema(schemas = {}) {
  return (req, res, next) => {
    const { body, params, query } = schemas;

    try {
      if (body) {
        const { error } = body.validate(req.body, { abortEarly: false });
        if (error) {
          const fields = extractErrors(error);
          throw new ApiError("FORMAT_ERROR", fields);
        }
      }

      if (params) {
        const { error } = params.validate(req.params, { abortEarly: false });
        if (error) {
          const fields = extractErrors(error);
          throw new ApiError("FORMAT_ERROR", fields);
        }
      }

      if (query) {
        const { error } = query.validate(req.query, { abortEarly: false });
        if (error) {
          const fields = extractErrors(error);
          throw new ApiError("FORMAT_ERROR", fields);
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

function extractErrors(error) {
  const result = {};
  for (const detail of error.details) {
    const key = detail.path.join(".");
    const cleanMessage = detail.message.replace(/^"(.+)"\s+/, "").trim();
    result[key] = cleanMessage;
  }
  return result;
}
