import { Goal, GoalSchema } from "./../folders/goals/goal.schema"
import { Tag, TagSchema } from "./../folders/tags/tag.schema"
import { Folder, FolderSchema } from "./../folders/folder.schema"
import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { User, UserSchema } from "./user.schema"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
