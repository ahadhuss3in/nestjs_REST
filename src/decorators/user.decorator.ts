import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const UuidParam = createParamDecorator((id: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const value = request.params[id];

    if (!value || !UUID_REGEX.test(value)) {
        throw new BadRequestException(`${id} must be a valid UUID`);
    }
    return value;
});