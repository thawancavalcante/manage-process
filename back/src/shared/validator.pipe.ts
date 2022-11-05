import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { BaseValidationOptions, ObjectSchema } from 'joi';

@Injectable()
export class ValidatorPipe implements PipeTransform {
    constructor(private schema: ObjectSchema, private options?: BaseValidationOptions) { }

    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'body') {
            return value
        }
        const { error } = this.schema.validate(value, this.options)

        if (error) {
            throw new HttpException(
                error.details.map(errDetail => ({
                    message: errDetail.message,
                    field: errDetail.context.key,
                })),
                HttpStatus.BAD_REQUEST
            )

        }

        return value
    }
}
