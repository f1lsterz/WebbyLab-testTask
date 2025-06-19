import Joi from "joi";

const actorNameRegex = /^[A-Za-zА-Яа-яҐґЄєІіЇї\s.'\-]+$/u;

const titlePattern = /[^\s]/;

export const getListOfMoviesQuerySchema = Joi.object({
  actor: Joi.string().trim().pattern(actorNameRegex).messages({
    "string.pattern.base": "Actor name contains invalid characters",
  }),

  title: Joi.string().trim().min(1).pattern(titlePattern).messages({
    "string.empty": "Title is required",
    "string.pattern.base": "Title must contain non-space characters",
  }),

  search: Joi.alternatives().try(
    Joi.string().trim().pattern(actorNameRegex).messages({
      "string.pattern.base":
        "Search (as actor) must contain only letters, spaces, '-', '.' or '''",
    }),
    Joi.string().trim().pattern(titlePattern).messages({
      "string.pattern.base":
        "Search (as title) must contain non-space characters",
    })
  ),

  sort: Joi.string().valid("id", "title", "year").messages({
    "any.only": 'Sort must be one of "id", "title", or "year"',
  }),

  order: Joi.string().valid("ASC", "DESC").messages({
    "any.only": 'Order must be either "ASC" or "DESC"',
  }),

  limit: Joi.number().integer().min(1).max(100).messages({
    "number.base": "Limit must be a number",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100",
  }),

  offset: Joi.number().integer().min(0).messages({
    "number.base": "Offset must be a number",
    "number.min": "Offset cannot be negative",
  }),
});
