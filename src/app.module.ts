import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    ContentModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CONNECTION_STRING || 
      "mongodb://localhost/content",
      {connectionName: "contents"}
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
