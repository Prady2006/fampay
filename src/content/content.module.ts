import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentController } from './content.controller';
import { Content, ContentSchema } from './content.schema';
import { ContentService } from './content.service';

@Module({
  imports:[MongooseModule.forFeature([{name: Content.name , schema: ContentSchema}],"contents")],
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule {}
