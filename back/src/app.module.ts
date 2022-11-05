import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProcessModule } from './process/process.module';
import { AdviseModule } from './advise/advise.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProcessModule,
    AdviseModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
