import { PaginatedResult } from "src/shared/prisma/utils/pagination";
import { Process } from "../../dto/process.dto";

export interface IProcessService {
    create(process: Process): Promise<string>
    get(id: string): Promise<Process>
    list(page: number): Promise<PaginatedResult<Process>>
}