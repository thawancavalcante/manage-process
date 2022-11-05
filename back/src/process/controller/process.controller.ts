import { Controller, Inject, Get, Post, Body, Param, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/shared/auth.guard'
import { Validate } from 'src/shared/validator.decorator'
import { User } from 'src/shared/user.decorator'
import { Process } from '../dto/process.dto'
import { IProcessService } from '../interface/service/process.service.interface'
import { Type } from '../interface/types'
import { CreateSchema } from '../schema/process.controller.schema'
import UserRole from 'src/shared/enum/UserRole.enum'

@Controller('process')
export class ProcessController {
    constructor(@Inject(Type.IProcessService) private service: IProcessService) { }

    @Post('')
    @UseGuards(new AuthGuard([UserRole.SORTING]))
    @Validate(CreateSchema, { abortEarly: false })
    async create(@Body() process: Process, @User('id') userId: string): Promise<object> {
        process.created_by_id = userId
        const id = await this.service.create(process)
        return { id }
    }

    @Get(':id')
    @UseGuards(new AuthGuard([UserRole.SORTING, UserRole.ADVISER]))
    async get(@Param('id') id: string): Promise<object> {
        const process = await this.service.get(id)
        if (!process) {
            throw new HttpException('Record not found', HttpStatus.NOT_FOUND)
        }

        return process
    }

    @Get('')
    @UseGuards(new AuthGuard([UserRole.SORTING]))
    async list(@Query('page') page: number): Promise<object> {
        return this.service.list(page)
    }
}