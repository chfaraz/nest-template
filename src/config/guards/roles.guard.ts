import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/modules/users/users.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(UsersService) private readonly UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    //check if the user id is same or not in case of same role level
    //1. get max role of user
    //2. then check and match there ids
    // const levels = {
    //   USER: 4,
    //   MANAGER: 3,
    //   ADMIN: 2,
    //   SUPERADMIN: 1,
    // };
    const getUser = await this.UsersService.findOne({ id: user.id });
    const level = user.roles.map((role) =>
      role === 'SUPERADMIN'
        ? 1
        : role === 'ADMIN'
        ? 2
        : role === 'MANAGER'
        ? 3
        : 4,
    );
    level.sort((a, b) => b - a);

    const Reqlevel = requiredRoles.map((role) =>
      role === 'SUPERADMIN'
        ? 1
        : role === 'ADMIN'
        ? 2
        : role === 'MANAGER'
        ? 3
        : 4,
    );
    level.sort((a, b) => b - a);

    //also find the max level in requiredRoles
    //if both levles are equal check ids
    if (level[0] === 3 && Reqlevel[0] === 3) {
      // now check ids they should be same
      if (user.id !== getUser.id) return false;
    } else if (level[0] === 2 && Reqlevel[0] === 2) {
      if (user.id !== getUser.id) return false;
    } else if (level[0] === 4 && Reqlevel[0] === 4) {
      if (user.id !== getUser.id) return false;
    }
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
