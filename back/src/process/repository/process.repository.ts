import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma';
import { handleDatabaseErrors } from 'src/shared/prisma/utils/handleDatabaseErrors';
import { createPaginator, PaginatedResult } from 'src/shared/prisma/utils/pagination';
import { Process } from '../dto/process.dto';
import { IProcessRepository } from '../interface/repository/process.repository.interface';
import UserRole from 'src/shared/enum/UserRole.enum'
import UserStatus from 'src/shared/enum/UserStatus.enum'

@Injectable()
export class ProcessRepository implements IProcessRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: Process): Promise<string> {
        try {
            const advisers = data.adviserIds.map(adviser_id => ({ adviser_id }))
            delete data.adviserIds
            const process = await this.prisma.process.create({
                data: { ...data, advise: { create: [...advisers] } }
            })
            return process.id
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }

    async verifyInvalidAdvisers(ids: string[]): Promise<string[]> {
        try {
            const result = await this.prisma.user.findMany({
                where: {
                    id: { in: ids },
                    OR: [
                        { status: UserStatus.INACTIVE },
                        {
                            NOT: {
                                roles: { has: UserRole.ADVISER }
                            }
                        }
                    ]
                },
            })

            return result.map(adviser => adviser.id)
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }

    async get(id: string): Promise<Process> {
        try {
            const result = await this.prisma.process.findUnique({
                where: { id },
                select: {
                    id: true,
                    title: true,
                    content_url: true,
                    created_at: true,
                    created_by_id: true,
                    advise: {
                        select: {
                            adviser: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            },
                            description: true,
                            updated_at: true,
                        }
                    },
                    created_by: {
                        select: {
                            name: true,
                        }
                    }
                },
            })

            return result
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }

    async list(page: number, limit: number): Promise<PaginatedResult<Process>> {
        try {
            const result = await createPaginator({ perPage: limit, page })<Process, Prisma.processFindManyArgs>(
                this.prisma.process,
                {
                    select: {
                        id: true,
                        title: true,
                        content_url: true,
                        created_at: true,
                        created_by_id: true,
                        advise: {
                            select: {
                                description: true,
                            }
                        },
                        created_by: {
                            select: {
                                name: true
                            }
                        }
                    },
                },
            )

            return result
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }
}