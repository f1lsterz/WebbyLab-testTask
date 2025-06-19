import ApiError from "../utils/apiError.js";

export default function validateFile(fieldName = "file", options = {}) {
  const { maxSize = 5 * 1024 * 1024, allowedMimeTypes = ["text/plain"] } =
    options;

  return (req, res, next) => {
    try {
      const file = req.file;

      if (!file || !file.buffer) {
        throw new ApiError("FILE_REQUIRED", {
          [fieldName]: "REQUIRED",
        });
      }

      if (file.buffer.length === 0) {
        throw new ApiError("FILE_EMPTY", {
          [fieldName]: "File is empty",
        });
      }

      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new ApiError("INVALID_FILE_TYPE", {
          [fieldName]: `Only ${allowedMimeTypes.join(", ")} files are allowed`,
        });
      }

      if (file.size > maxSize) {
        throw new ApiError("FILE_TOO_LARGE", {
          [fieldName]: `Max file size is ${maxSize / 1024 / 1024}MB`,
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
