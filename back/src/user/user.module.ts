import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma';
import { UserController } from "./controller/user.controller";
import { Type } from './interface/types';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

const Repository = { provide: Type.IUserRepository, useClass: UserRepository };
const Service = { provide: Type.IUserService, useClass: UserService };

@Module({
    controllers: [UserController],
    providers: [Service, Repository, PrismaService],
})
export class UserModule { }