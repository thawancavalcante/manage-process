import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { Adviser, Process } from '../dto/advise.dto';
import { IAdviseRepository } from '../interface/repository/advise.repository.interface'
import { IAdviseService } from '../interface/service/advise.service.interface'
import { Type } from '../interface/types'
import { PaginatedResult } from 'src/shared/prisma/utils/pagination';


@Injectable()
export class AdviseService implements IAdviseService {
    constructor(@Inject(Type.IAdviseRepository) private repository: IAdviseRepository) { }

    async findAdvisers(name: string): Promise<Adviser[]> {
        const Limit = 5
        try {
            return await this.repository.findAdvisers(name, Limit)
        } catch (err) {
            throw err
        }
    }

    async listPendingProcess(adviserId: string, page: number): Promise<PaginatedResult<Process>> {
        const Limit = 5
        try {
            return await this.repository.listPendingProcess(adviserId, page, Limit)
        } catch (err) {
            throw err
        }
    }

    async update(adviserId: string, processId: string, description: string): Promise<boolean> {
        try {
            const advise = await this.repository.getAdviseByProcessIdAndAdviserId(adviserId, processId)
            console.log(advise)
            if(!advise) {
                throw new HttpException('Record not found', HttpStatus.NOT_FOUND)
            }
            this.repository.update(advise.id, description)
            return true
        } catch (err) {
            throw err
        }
    }
}