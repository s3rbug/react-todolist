import { Goal, GoalSchema } from "./goals/goal.schema"
import { Tag, TagSchema } from "./tags/tag.schema"
import { Folder, FolderSchema } from "./folder.schema"
import { User, UserSchema } from "./../users/user.schema"
import { MongooseModule } from "@nestjs/mongoose"
import { UsersModule } from "./../users/users.module"
import { Module } from "@nestjs/common"

import { FoldersService } from "./folders.service"
import { FoldersController } from "./folders.controller"
import { UsersService } from "src/users/users.service"

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	controllers: [FoldersController],
	providers: [FoldersService],
})
export class FoldersModule {}
