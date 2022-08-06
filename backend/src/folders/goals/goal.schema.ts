import { Tag, TagSchema } from './../tags/tag.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";

export type GoalDocument = Goal & Document;

@Schema({ _id: false})
export class Goal {
    
    @Prop({required: true})
    id: string

    @Prop({required: true})
    text: string

    @Prop()
    note: string

    @Prop()
    tagId: string

    @Prop({required: true})
    checked: boolean
}

export const GoalSchema = SchemaFactory.createForClass(Goal);