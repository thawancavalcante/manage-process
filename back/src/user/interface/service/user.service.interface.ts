import { PaginatedResult } from 'src/shared/prisma/utils/pagination'
import { User } from 'src/user/dto/user.dto'

export interface IUserService {
    create(user: User): Promise<string>
    update(id: string, user: User): Promise<boolean>
    get(id: string): Promise<User>
    activate(id: string): Promise<boolean>
    inactivate(id: string): Promise<boolean>
    list(page: number): Promise<PaginatedResult<User>>
}