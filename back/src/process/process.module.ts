import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma';
import { ProcessController } from "./controller/process.controller";
import { Type } from './interface/types';
import { ProcessRepository } from './repository/process.repository';
import { ProcessService } from './service/process.service';

const Repository = { provide: Type.IProcessRepository, useClass: ProcessRepository };
const Service = { provide: Type.IProcessService, useClass: ProcessService };

@Module({
    controllers: [ProcessController],
    providers: [Service, Repository, PrismaService],
})
export class ProcessModule { }