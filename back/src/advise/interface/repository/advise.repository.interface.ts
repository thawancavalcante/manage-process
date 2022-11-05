import { PaginatedResult } from 'src/shared/prisma/utils/pagination'
import { Advise, Adviser, Process } from '../../dto/advise.dto'

export interface IAdviseRepository {
    listAdvisers(page: number, limit: number): Promise<PaginatedResult<Adviser>>
    listPendingProcess(adviserId: string, page: number, limit: number): Promise<PaginatedResult<Process>>
    getAdviseByProcessIdAndAdviserId(adviserId: string, processId: string): Promise<Advise>
    update(id: string, description: string)
}