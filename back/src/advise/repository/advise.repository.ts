import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma';
import { handleDatabaseErrors } from 'src/shared/prisma/utils/handleDatabaseErrors';
import { createPaginator, PaginatedResult } from 'src/shared/prisma/utils/pagination';
import { Advise, Adviser, Process } from '../dto/advise.dto';
import { IAdviseRepository } from '../interface/repository/advise.repository.interface';
import UserRole from 'src/shared/enum/UserRole.enum'
import UserStatus from 'src/shared/enum/UserStatus.enum'

@Injectable()
export class AdviseRepository implements IAdviseRepository {
    constructor(private prisma: PrismaService) { }

    async findAdvisers(name: string, limit: number): Promise<Adviser[]> {
        try {

            const result = await this.prisma.$queryRaw <Adviser[]>`
            SELECT id, name, email FROM "user"
            WHERE name ILIKE ${`%${name}%`} AND
            status = 'ACTIVE' AND
            'ADVISER' = ANY(roles)
            ORDER BY name DESC
            LIMIT ${limit};
        `;

            return result
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }

    async listPendingProcess(adviserId: string, page: number, limit: number): Promise<PaginatedResult<Process>> {
        try {
            const result = await createPaginator({ perPage: limit, page })<Process, Prisma.processFindManyArgs>(
                this.prisma.process,
                {
                    where: {
                        advise: { every: { adviser_id: adviserId, description: '' }, some: {} },
                    },
                    select: {
                        id: true,
                        title: true,
                        created_at: true,
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

    async getAdviseByProcessIdAndAdviserId(adviserId: string, processId: string): Promise<Advise> {
        try {
            return this.prisma.advise.findFirst({
                where: { adviser_id: adviserId, process_id: processId, description: null },
            })
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }

    async update(id: string, description: string) {
        try {
            await this.prisma.advise.update({
                where: { id },
                data: { description: description, updated_at: new Date() },
            })
        } catch (err) {
            throw handleDatabaseErrors(err)
        }
    }

}