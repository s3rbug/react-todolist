import { Document } from "mongoose"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type TagDocument = Tag & Document

@Schema({ _id: false })
export class Tag {
	@Prop({
		required: true,
		unique: true,
		partialFilterExpression: { $ne: null },
	})
	id: string

	@Prop({ required: true, unique: false, minlength: 3 })
	name: string

	@Prop({ required: true })
	color: string
}

export const TagSchema = SchemaFactory.createForClass(Tag)
