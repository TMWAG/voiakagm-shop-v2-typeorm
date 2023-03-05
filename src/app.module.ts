import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import CONNECTION from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...CONNECTION,
      autoLoadEntities: true,
      synchronize: Boolean(process.env.DB_SYNC),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
