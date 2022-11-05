import { Injectable, Inject, HttpException } from '@nestjs/common'
import { generateHash } from 'src/shared/utils/hash'
import { User } from '../dto/user.dto'
import { IUserRepository } from '../interface/repository/user.repository.interface'
import { IUserService } from '../interface/service/user.service.interface'
import { Type } from '../interface/types'
import UserStatus from 'src/shared/enum/UserStatus.enum';
import { PaginatedResult } from 'src/shared/prisma/utils/pagination'


@Injectable()
export class UserService implements IUserService {
    constructor(@Inject(Type.IUserRepository) private repository: IUserRepository) { }

    async create(user: User): Promise<string> {
        try {
            user.password_hash = generateHash(user.password)
            delete user.password

            const id = await this.repository.create(user)
            return id
        } catch (err) {
            throw err
        }
    }

    async update(id: string, user: User): Promise<boolean> {
        try {
            if (user.password) {
                user.password_hash = generateHash(user.password)
                delete user.password
            }

            return this.repository.update(id, user)
        } catch (err) {
            throw err
        }
    }

    async get(id: string): Promise<User> {
        try {
            return this.repository.get(id)
        } catch (err) {
            throw err
        }
    }

    async inactivate(id: string): Promise<boolean> {
        try {
            const user = await this.repository.get(id)
            if (!user) {
                return false
            }

            await this.repository.inactivateUserAndDeletePendingAdvises(id)
            return true
        } catch (err) {
            throw err
        }
    }

    async activate(id: string): Promise<boolean> {
        try {
            const user = await this.repository.get(id)
            if (!user) {
                return false
            }
            await this.repository.activate(id)
            return true
        } catch (err) {
            throw err
        }
    }

    async list(page: number): Promise<PaginatedResult<User>> {
        const Limit = 10
        try {
            return await this.repository.list(page, Limit)
        } catch (err) {
            throw err
        }
    }
}