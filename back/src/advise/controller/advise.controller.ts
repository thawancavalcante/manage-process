import { Controller, Inject, Get, Put, Body, Query, UseGuards, HttpException, HttpStatus } from '@nestjs/common'
import { AuthGuard } from 'src/shared/auth.guard'
import { Validate } from 'src/shared/validator.decorator'
import { Advise } from '../dto/advise.dto'
import { IAdviseService } from '../interface/service/advise.service.interface'
import { Type } from '../interface/types'
import { UpdateSchema } from '../schema/advise.controller.schema'
import UserRole from 'src/shared/enum/UserRole.enum'
import { User } from 'src/shared/user.decorator'

@Controller('advise')
export class AdviseController {
    constructor(@Inject(Type.IAdviseService) private service: IAdviseService) { }

    @Get('advisers')
    @UseGuards(new AuthGuard([UserRole.SORTING]))
    async listAdvisers(@Query() page: number): Promise<object> {
        const advisers = await this.service.listAdvisers(page)
        return { advisers }
    }

    @Get('pending-process')
    @UseGuards(new AuthGuard([UserRole.ADVISER]))
    async listPendingProcess(@Query() page: number, @User('id') userId: string): Promise<object> {
        const process = await this.service.listPendingProcess(userId, page)
        return { process }
    }

    @Put('')
    @UseGuards(new AuthGuard([UserRole.ADVISER]))
    @Validate(UpdateSchema, { abortEarly: false })
    async update(@Body() advise: Advise, @User('id') userId: string): Promise<object> {
        const success = await this.service.update(userId, advise.process_id, advise.description)
        return { success }
    }
}