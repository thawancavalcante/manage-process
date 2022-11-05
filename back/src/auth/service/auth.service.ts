import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { verifyHash } from 'src/shared/utils/hash'
import { encode } from 'src/shared/utils/jwt'
import { Login } from '../dto/auth.dto'
import { IAuthRepository } from '../interface/repository/auth.repository.interface'
import { IAuthService } from '../interface/service/auth.service.interface'
import { Type } from '../interface/types'
import UserStatus from 'src/shared/enum/UserStatus.enum'


@Injectable()
export class AuthService implements IAuthService {
    constructor(@Inject(Type.IAuthRepository) private repository: IAuthRepository) { }

    async login(loginData: Login): Promise<string> {
        try {
            const user = await this.repository.get(loginData.email)
            if (!user) {
                throw new HttpException('invalid email or password', HttpStatus.BAD_REQUEST)
            }

            if (user.status != UserStatus.ACTIVE) {
                throw new HttpException('inactive user', HttpStatus.FORBIDDEN)
            }

            const isValid: boolean = verifyHash(loginData.password, user.password_hash)
            if (!isValid) {
                throw new HttpException('invalid email or password', HttpStatus.BAD_REQUEST)
            }

            const token = encode({
                id: user.id,
                name: user.name,
                status: user.status,
                roles: user.roles
            })

            return token
        } catch (err) {
            throw err
        }
    }
}