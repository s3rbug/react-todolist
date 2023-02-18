import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

import { Goal, GoalSchema } from "./goals/goal.schema"
import mongoose, { Document } from "mongoose"

export type FolderDocument = Folder & Document

@Schema({ _id: false })
export class Folder {
	@Prop({
		required: true,
		unique: true,
		partialFilterExpression: { $ne: null },
	})
	id: string

	@Prop({ required: true })
	headline: string

	@Prop({ type: [GoalSchema] })
	goals: Goal[]
}

export const FolderSchema = SchemaFactory.createForClass(Folder)
