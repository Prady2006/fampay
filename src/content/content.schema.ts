import { Prop, Schema , SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type ContentDocument = HydratedDocument<Content>;

@Schema()
export class Content   {

    @Prop({unique: true })
    title : string
    
    @Prop()
    description: string
    
    @Prop({ index: true })
    publishTime: Date

    @Prop()
    thumbnails: string[]
}
export const ContentSchema = SchemaFactory.createForClass(Content)