import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export type Role = 'admin' | 'user';

export const Roles = (...allowed: Role[]) => SetMetadata(ROLES_KEY, allowed);
