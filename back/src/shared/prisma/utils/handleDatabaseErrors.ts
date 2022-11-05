import { PrismaClientError } from '../errors/PrismaClientError';
import { UniqueConstraintError } from '../errors/UniqueConstraintError';
import { NotFoundError } from '../errors/NotFoundError';
import { DatabaseError } from '../errors/DatabaseError';
import { Errors } from '../errors/ErrorsCode';

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
    switch (e.code) {
        case Errors.UniqueConstraintFail:
            return new UniqueConstraintError(e);
        case Errors.NotFoundFail:
            return new NotFoundError(e);
        default:
            return new DatabaseError(e.message);
    }
};