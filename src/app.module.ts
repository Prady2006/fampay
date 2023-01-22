import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ContentModule } from './content/content.module';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    ContentModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(
      {isGlobal: true}
    ),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: parseInt(process.env.REDIS_PORT),
      }
    }),
    MongooseModule.forRoot(
      `${process.env.CONN_HOST}:${process.env.CONN_PORT}/${process.env.DB_NAME}` ,
      {connectionName: "contents"}
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
