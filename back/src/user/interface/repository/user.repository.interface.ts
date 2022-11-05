import { PaginatedResult } from 'src/shared/prisma/utils/pagination'
import { User } from 'src/user/dto/user.dto'

export interface IUserRepository {
    create(data: User): Promise<string>
    update(id: string, data: User)
    activate(id: string)
    get(id: string): Promise<User>
    inactivateUserAndDeletePendingAdvises(id: string)
    list(page: number, limit: number): Promise<PaginatedResult<User>>
}