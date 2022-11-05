import UserRole from 'src/shared/enum/UserRole.enum'
import UserStatus from 'src/shared/enum/UserStatus.enum'

export class Login {
    public email: string
    public password: string
}

export class User {
    public id: string
    public email: string
    public name: string
    public password_hash: string
    public status: UserStatus
    public roles: UserRole[]
    public created_at: Date
}