import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma';
import { AuthController } from "./controller/auth.controller";
import { Type } from './interface/types';
import { AuthRepository } from './repository/auth.repository';
import { AuthService } from './service/auth.service';

const Repository = { provide: Type.IAuthRepository, useClass: AuthRepository };
const Service = { provide: Type.IAuthService, useClass: AuthService };

@Module({
    controllers: [AuthController],
    providers: [Service, Repository, PrismaService],
})
export class AuthModule { }