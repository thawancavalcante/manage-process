import { applyDecorators, UsePipes } from '@nestjs/common';
import { BaseValidationOptions, ObjectSchema } from 'joi';

import { ValidatorPipe } from './validator.pipe';

export function Validate(schema: ObjectSchema, options?: BaseValidationOptions) {
    return applyDecorators(
        UsePipes(new ValidatorPipe(schema, options))
    );
}