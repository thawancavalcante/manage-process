import { Controller, Inject, Post, Body, HttpException, HttpStatus } from '@nestjs/common'
import { Validate } from 'src/shared/validator.decorator'
import { Login } from '../dto/auth.dto'
import { IAuthService } from '../interface/service/auth.service.interface'
import { Type } from '../interface/types'
import { LoginSchema } from '../schema/auth.controller.schema'

@Controller('auth')
export class AuthController {
    constructor(@Inject(Type.IAuthService) private service: IAuthService) { }

    @Post('')
    @Validate(LoginSchema, { abortEarly: false })
    async login(@Body() accessData: Login): Promise<object> {
        const token = await this.service.login(accessData)
        return { token }
    }
}