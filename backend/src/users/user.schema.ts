import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Tag } from './../folders/tags/tag.schema';
import { Folder } from './../folders/folder.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true, unique: true, minlength: 6, maxlength: 100})
    username: string

    @Prop({required: true, minlength: 6, maxlength: 100})
    password: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Folder'}]})
    folders: Folder[]

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]})
    tags: Tag[]
}

export const UserSchema = SchemaFactory.createForClass(User);