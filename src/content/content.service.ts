import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ContentDocument , Content} from "./content.schema";
import { Model } from "mongoose"

@Injectable()
export class ContentService {
    constructor(@InjectModel(Content.name,"contents") private contentModel: Model<ContentDocument>){

    }
}