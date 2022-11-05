import * as Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import UserRole from 'src/shared/enum/UserRole.enum';
const JoiPassword = Joi.extend(joiPasswordExtendCore);

export const CreateUserSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    roles: Joi.array().items(Joi.string().valid(...Object.values(UserRole))).required(),
    password: JoiPassword
        .string()
        .min(8)
        .minOfSpecialCharacters(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required(),
})

export const UpdateUserSchema = Joi.object({
    email: Joi.string().email(),
    name: Joi.string(),
    roles: Joi.array().items(Joi.string().valid(...Object.values(UserRole))),
    password: JoiPassword
        .string()
        .min(8)
        .minOfSpecialCharacters(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces(),
})