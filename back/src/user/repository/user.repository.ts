import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma';
import { Prisma, user as UserModel } from '@prisma/client'
import { handleDatabaseErrors } from 'src/shared/prisma/utils/handleDatabaseErrors';
import { User } from '../dto/user.dto';
import { IUserRepository } from '../interface/repository/user.repository.interface';
import UserStatus from 'src/shared/enum/UserStatus.enum';
import { createPaginator, PaginatedResult } from 'src/shared/prisma/utils/pagination';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private prisma: PrismaService) { }

    async create(user: User): Promise<string> {
        try {
            const data: UserModel = {
                ...user,
                password_hash: user.password_hash,
            }
            const newUser = await this.prisma.user.create({ data })
            return newUser.id
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }

    async update(id: string, data: User) {
        try {
            await this.prisma.user.update({
                where: { id },
                data,
            })
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }

    async get(id: string): Promise<User> {
        try {
            return this.prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    created_at: true,
                    roles: true,
                    status: true,
                }
            })
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }

    async activate(id: string) {
        try {
            await this.prisma.user.update({
                where: { id },
                data: {
                    status: UserStatus.ACTIVE,
                },
            })
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }

    async inactivateUserAndDeletePendingAdvises(id: string) {
        try {
            await this.prisma.$transaction([
                this.prisma.user.update({
                    where: { id },
                    data: { status: UserStatus.INACTIVE },
                }),
                this.prisma.advise.deleteMany({
                    where: { adviser_id: id, updated_at: null },
                }),
            ])
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }

    async list(page: number, limit: number): Promise<PaginatedResult<User>> {
        try {
            const result = await createPaginator({ perPage: limit, page })<User, Prisma.userFindManyArgs>(
                this.prisma.user,
                {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        created_at: true,
                        roles: true,
                        status: true,
                    },
                },
            )

            return result
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }
}