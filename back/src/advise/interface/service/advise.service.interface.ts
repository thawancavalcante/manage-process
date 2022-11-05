import { PaginatedResult } from 'src/shared/prisma/utils/pagination'
import { Advise, Adviser, Process } from '../../dto/advise.dto'

export interface IAdviseService {
    listAdvisers(page: number): Promise<PaginatedResult<Adviser>>
    listPendingProcess(adviserId: string, page: number): Promise<PaginatedResult<Process>>
    update(adviserId: string, processId: string, description: string): Promise<boolean>
}