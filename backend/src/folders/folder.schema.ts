import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Goal } from './goals/goal.schema';
import mongoose, {Document} from 'mongoose';

export type FolderDocument = Folder & Document;

@Schema()
export class Folder {
    @Prop({required: true})
    headline: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Goal"}]})
    goals: Goal[]
}

export const FolderSchema = SchemaFactory.createForClass(Folder);