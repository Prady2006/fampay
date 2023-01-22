import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContentService } from './content.service';
import { GetContentDto } from './dto/get-content.dto';
import { SearchContentDto } from './dto/search-content.dto';

@Controller('content')
export class ContentController {

    constructor(private contentService : ContentService){

    }
    @Get()
    @UsePipes(ValidationPipe)
    getContent( @Param() getContentDto: GetContentDto){

    }

    @Get("/search")
    @UsePipes(ValidationPipe)
    searchContent(@Param() searchContentDto: SearchContentDto){

    }

}
