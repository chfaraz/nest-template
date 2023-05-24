import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(111111,requiredRoles,context.switchToHttp().getRequest().user);
    
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    //i think we will need jwt decoded here
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}