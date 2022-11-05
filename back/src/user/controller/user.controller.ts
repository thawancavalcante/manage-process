import { Controller, Inject, Post, Body, Query, Param, Get, Put, HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/shared/auth.guard'
import { Validate } from 'src/shared/validator.decorator'
import { User } from '../dto/user.dto'
import { IUserService } from '../interface/service/user.service.interface'
import { Type } from '../interface/types'
import { CreateUserSchema, UpdateUserSchema } from '../schema/user.controller.schema'
import UserRole from 'src/shared/enum/UserRole.enum'

@Controller('user')
export class UserController {
    constructor(@Inject(Type.IUserService) private service: IUserService) { }

    @Post('')
    @UseGuards(new AuthGuard([UserRole.ADMIN]))
    @Validate(CreateUserSchema, { abortEarly: false })
    async create(@Body() user: User): Promise<object> {
        const id = await this.service.create(user)
        return { id }
    }

    @Put(':id')
    @UseGuards(new AuthGuard([UserRole.ADMIN]))
    @Validate(UpdateUserSchema, { abortEarly: false })
    async update(@Param('id') id: string, @Body() user: User): Promise<object> {
        const success = await this.service.update(id, user)
        return { success }
    }

    @Get(':id')
    @UseGuards(new AuthGuard([UserRole.ADMIN]))
    async get(@Param('id') id: string): Promise<object> {
        const user = await this.service.get(id)
        if (!user) {
            throw new HttpException('Record not found', HttpStatus.NOT_FOUND)
        }

        return user
    }

    @Put('inactivate/:id')
    @UseGuards(new AuthGuard([UserRole.ADMIN]))
    async inactivate(@Param('id') id: string): Promise<object> {
        const success = await this.service.inactivate(id)
        return { success }
    }

    @Put('activate/:id')
    @UseGuards(new AuthGuard([UserRole.ADMIN]))
    async activate(@Param('id') id: string): Promise<object> {
        const success = await this.service.activate(id)
        return { success }
    }

    @Get('')
    @UseGuards(new AuthGuard([UserRole.ADMIN]))
    async list(@Query('page') page: number): Promise<object> {
        return this.service.list(page)
    }
}