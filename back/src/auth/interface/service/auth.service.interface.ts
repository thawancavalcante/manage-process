import { Login } from '../../dto/auth.dto'

export interface IAuthService {
    login(user: Login): Promise<string>
}