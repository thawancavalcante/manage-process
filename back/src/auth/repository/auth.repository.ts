import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma';
import { handleDatabaseErrors } from 'src/shared/prisma/utils/handleDatabaseErrors';
import { User } from '../dto/auth.dto';
import { IAuthRepository } from '../interface/repository/auth.repository.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
    constructor(private prisma: PrismaService) { }

    async get(email: string): Promise<User> {
        try {
            return this.prisma.user.findUnique({
                where: { email },
            })
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }
}