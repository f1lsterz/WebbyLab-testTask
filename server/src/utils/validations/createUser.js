import Joi from "joi";

const userNameRegex = /^[A-Za-zА-Яа-яҐґЄєІіЇї\s.'\-]+$/u;

export const createUserSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),

  name: Joi.string().trim().min(1).pattern(userNameRegex).required().messages({
    "string.empty": "Name is required",
    "string.pattern.base":
      "Name must contain only letters, spaces, '-', '.' or '''",
  }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/[^\s]/)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[^A-Za-z0-9]/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 128 characters long",
      "string.pattern.base":
        "Password must include at least one uppercase letter, one lowercase letter, one digit, one special character, and not be only whitespace",
    }),

  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Passwords do not match",
    "string.empty": "Password confirmation is required",
  }),
});
