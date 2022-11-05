import { Injectable, CanActivate, ExecutionContext, HttpStatus, HttpException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { decode } from './utils/jwt'
import UserRole from 'src/shared/enum/UserRole.enum'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private rolesAllowed: UserRole[]) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        let token: string | null = req.headers.authorization
        if (!token) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
        }

        const jwtDecoded = decode(token.split(" ")[1])
        if (!jwtDecoded) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
        }

        const userRoles: UserRole = jwtDecoded['roles']
        for (let userRole of userRoles) {
            for (let role of this.rolesAllowed) {
                req.user = jwtDecoded
                if (userRole === role) {
                    return true
                }
            }
        }

        throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN)
    }
}
