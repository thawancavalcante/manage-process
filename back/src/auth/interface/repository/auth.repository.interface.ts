import { User } from '../../dto/auth.dto'

export interface IAuthRepository {
    get(email: string): Promise<User> | null
}