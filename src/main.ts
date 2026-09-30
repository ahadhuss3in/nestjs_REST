import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { RolesInterceptor } from './decorators/index.js';
import { UserController } from './user/user.controller.js';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new RolesInterceptor(app.get(Reflector), [UserController]),
);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
