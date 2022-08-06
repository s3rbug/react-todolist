import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TagDocument = Tag & Document;

@Schema({ _id: false})
export class Tag {

    @Prop({required: true, unique: true})
    id: string

    @Prop({required: true, unique: true, minlength: 3})
    name: string

    @Prop({required: true})
    color: string
}

export const TagSchema = SchemaFactory.createForClass(Tag);