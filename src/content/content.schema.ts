import { Prop, Schema , SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type ContentDocument = HydratedDocument<Content>;

@Schema()
export class Content   {
    @Prop()
    title : string
    
    @Prop()
    description: string
    
    @Prop()
    datetime: Date
}

export const ContentSchema = SchemaFactory.createForClass(Content)