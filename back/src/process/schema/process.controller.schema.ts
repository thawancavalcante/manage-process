import * as Joi from 'joi';

export const CreateSchema = Joi.object({
    title: Joi.string().max(30).required(),
    content_url: Joi.string().required(),
    adviserIds: Joi.array().items(Joi.string()).min(1),
})