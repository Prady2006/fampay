import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ContentDocument , Content} from "./content.schema";
import { Model } from "mongoose"
import { Logger } from "@nestjs/common";
import { GetContentDto } from "./dto/get-content.dto";
import { SearchContentDto } from "./dto/search-content.dto";

@Injectable()
export class ContentService {
    private readonly logger = new Logger(Content.name);
    constructor(@InjectModel(Content.name,"contents") private contentModel: Model<ContentDocument>){

    }

    async add(contentData) {
        let content = new this.contentModel()
        content.title = contentData.snippet.title
        content.description = contentData.snippet.description
        content.publishTime = contentData.snippet.publishTime
        content.thumbnails = Object.values(contentData.snippet.thumbnails).map((t)=>{
            return t["url"]
        })
        try{
            await content.save()
            console.log("Data Added to Mongodb .")
        }catch(e){
            console.log(e)
        }
    }

    async getItems(getContentDto: GetContentDto): Promise<Content[]>{
        let find_query= []
        let { limit = 10 , skip = 0 } = getContentDto
        find_query.push({
            $sort: {
                publishTime: -1
            }
        })
        find_query.push({
            $skip: Number(skip)
        })

        find_query.push({
            $limit: Number(limit)
        })
        return await this.contentModel.aggregate(find_query).allowDiskUse(true)
    }

    async searchItems(searchContentDto: SearchContentDto): Promise<Content[]> {
        let find_query = []
        let {title, description} = searchContentDto

        if(title){
            find_query.push({
                $match : {
                    title: {$regex: new RegExp(title), $options:"i"},
                }
            })
        }
        if(description){
            find_query.push({
                $match : {
                    title: {$regex: new RegExp(description), $options:"i"},

                }
            })
        }
        return await this.contentModel.aggregate(find_query).allowDiskUse(true)
    }
}