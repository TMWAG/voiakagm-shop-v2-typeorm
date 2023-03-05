import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import CONNECTION from './config/db.config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...CONNECTION,
      autoLoadEntities: true,
      synchronize: Boolean(process.env.DB_SYNC),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
