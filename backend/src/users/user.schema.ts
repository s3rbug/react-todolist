import mongoose, { Document, Types } from "mongoose"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

import { Tag, TagSchema } from "./../folders/tags/tag.schema"
import { Folder, FolderSchema } from "./../folders/folder.schema"

export type UserDocument = User & Document

@Schema()
export class User {
	@Prop({ required: true, unique: true, minlength: 6, maxlength: 100 })
	username: string

	@Prop({ required: true, minlength: 6, maxlength: 100 })
	password: string

	@Prop({ type: [FolderSchema] })
	folders: Folder[]

	@Prop({ type: [TagSchema] })
	tags: Tag[]

	@Prop()
	currentFolders: Array<string | null>
}

export const UserSchema = SchemaFactory.createForClass(User)
