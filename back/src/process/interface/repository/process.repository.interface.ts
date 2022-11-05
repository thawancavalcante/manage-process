import { Process } from "src/process/dto/process.dto";
import { PaginatedResult } from "src/shared/prisma/utils/pagination";

export interface IProcessRepository {
    create(data: Process): Promise<string>
    verifyInvalidAdvisers(ids: string[]): Promise<string[]>
    get(id: string): Promise<Process>
    list(page: number, limit: number): Promise<PaginatedResult<Process>>
}