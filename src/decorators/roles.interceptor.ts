import {
    ForbiddenException,
    Injectable,
    type CallHandler,
    type ExecutionContext,
    type NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, type Role } from './roles.decorator.js';

@Injectable()
export class RolesInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector,private readonly scope: Function[] = [],) {}

    intercept(context: ExecutionContext, next: CallHandler) {
        const roles =
            this.reflector.getAllAndOverride<Role[] | undefined>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]) ?? [];

        if (roles.length > 0) {
            const role = context.switchToHttp().getRequest().headers['x-role'];

            if (!role || !roles.includes(role as Role)) {
                throw new ForbiddenException('Insufficient role');
            }
        }

        return next.handle();
    }
}
