import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma';
import { AdviseController } from "./controller/advise.controller";
import { Type } from './interface/types';
import { AdviseRepository } from './repository/advise.repository';
import { AdviseService } from './service/advise.service';

const Repository = { provide: Type.IAdviseRepository, useClass: AdviseRepository };
const Service = { provide: Type.IAdviseService, useClass: AdviseService };

@Module({
    controllers: [AdviseController],
    providers: [Service, Repository, PrismaService],
})
export class AdviseModule { }