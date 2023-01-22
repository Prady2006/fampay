import { Body, Controller,Post, Get, Param, ParseIntPipe, Query, UsePipes, ValidationPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { ContentService } from './content.service';
import { GetContentDto } from './dto/get-content.dto';
import { SearchContentDto } from './dto/search-content.dto';

@Controller('content')
export class ContentController {

    constructor(private contentService : ContentService){

    }
    @Get("/")
    @UsePipes(ValidationPipe)
    getContent( @Query() getContentDto: GetContentDto){
        return this.contentService.getItems(getContentDto)
    }

    @Post("/search")
    @UsePipes(ValidationPipe)
    searchContent(@Body() searchContentDto: SearchContentDto){
        if(Object.keys(searchContentDto).length == 0 ){
            throw new BadRequestException("Empty Body")
        }
        return this.contentService.searchItems(searchContentDto)
    }

}
