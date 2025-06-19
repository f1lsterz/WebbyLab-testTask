import Joi from "joi";
import MOVIE_FORMAT_TYPES from "../movieFormatType.js";

const actorNameRegex = /^[A-Za-zА-Яа-яҐґЄєІіЇї\s.'\-]+$/u;

export const createMovieSchema = Joi.object({
  title: Joi.string().trim().min(1).pattern(/[^\s]/).required().messages({
    "string.empty": "Title is required",
    "string.pattern.base": "Title must contain non-space characters",
  }),

  year: Joi.number().integer().min(1850).max(2025).required().messages({
    "number.base": "Year must be a number",
    "number.min": "Year must be >= 1850",
    "number.max": "Year must be <= 2025",
  }),

  format: Joi.string()
    .valid(...Object.values(MOVIE_FORMAT_TYPES))
    .required()
    .messages({
      "any.only": `Format should be one of: ${Object.values(
        MOVIE_FORMAT_TYPES
      ).join(", ")}`,
    }),

  actors: Joi.array()
    .items(
      Joi.string().trim().pattern(actorNameRegex).required().messages({
        "string.empty": "Actor name is required",
        "string.pattern.base":
          "Actor name must contain only letters, spaces, '-', '.' or '''",
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Actors must be an array",
      "array.min": "At least one actor is required",
    }),
});
