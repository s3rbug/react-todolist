import { Tag } from './../tags/tag.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";

export type GoalDocument = Goal & Document;

@Schema()
export class Goal {
    @Prop({required: true})
    text: string

    @Prop()
    note: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Tag'})
    tag: Tag

    @Prop({required: true})
    checked: boolean
}

export const GoalSchema = SchemaFactory.createForClass(Goal);