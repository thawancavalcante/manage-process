import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { Advise, Adviser, Process } from '../dto/advise.dto';
import { IAdviseRepository } from '../interface/repository/advise.repository.interface'
import { IAdviseService } from '../interface/service/advise.service.interface'
import { Type } from '../interface/types'
import UserStatus from 'src/shared/enum/UserStatus.enum'
import { PaginatedResult } from 'src/shared/prisma/utils/pagination';


@Injectable()
export class AdviseService implements IAdviseService {
    constructor(@Inject(Type.IAdviseRepository) private repository: IAdviseRepository) { }

    async listAdvisers(page: number): Promise<PaginatedResult<Adviser>> {
        const Limit = 10
        try {
            return await this.repository.listAdvisers(page, Limit)
        } catch (err) {
            throw err
        }
    }

    async listPendingProcess(adviserId: string, page: number): Promise<PaginatedResult<Process>> {
        const Limit = 10
        try {
            return await this.repository.listPendingProcess(adviserId, page, Limit)
        } catch (err) {
            throw err
        }
    }

    async update(adviserId: string, processId: string, description: string): Promise<boolean> {
        try {
            const advise = await this.repository.getAdviseByProcessIdAndAdviserId(adviserId, processId)
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