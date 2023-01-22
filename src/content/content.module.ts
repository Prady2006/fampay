import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { ContentController } from './content.controller';
import { ContentSchedulerService } from './content.scheduler';
import { Content, ContentSchema } from './content.schema';
import { ContentService } from './content.service';
import { ContentProcessor } from './content.processor';


@Module({
  imports:[
    HttpModule,
    BullModule.registerQueue({
      name: "content",
    }),
    MongooseModule.forFeature([{name: Content.name , schema: ContentSchema}],"contents"),
  ],
  controllers: [ContentController],
  providers: [ContentService,ContentSchedulerService,ContentProcessor],
})
export class ContentModule {}
