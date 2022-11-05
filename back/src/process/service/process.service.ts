import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'

import { IProcessRepository } from '../interface/repository/process.repository.interface'
import { IProcessService } from '../interface/service/process.service.interface'
import { Type } from '../interface/types'
import { Process } from '../dto/process.dto'
import { PaginatedResult } from 'src/shared/prisma/utils/pagination'


@Injectable()
export class ProcessService implements IProcessService {
    constructor(@Inject(Type.IProcessRepository) private repository: IProcessRepository) { }

    async create(process: Process): Promise<string> {
        try {
            const advisers = await this.repository.verifyInvalidAdvisers(process.adviserIds)
            if (advisers.length > 0) {
                throw new HttpException({ message: "Invalid advisers", ids: advisers }, HttpStatus.BAD_REQUEST)
            }
            const id = await this.repository.create(process)
            return id
        } catch (err) {
            throw err
        }
    }

    async get(id: string): Promise<Process> {
        try {
            return this.repository.get(id)
        } catch (err) {
            throw err
        }
    }

    async list(page: number): Promise<PaginatedResult<Process>> {
        const Limit = 10
        try {
            return await this.repository.list(page, Limit)
        } catch (err) {
            throw err
        }
    }
}