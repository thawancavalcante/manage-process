import * as Joi from 'joi';

export const UpdateSchema = Joi.object({
    description: Joi.string().required(),
    process_id: Joi.string().required(),
})