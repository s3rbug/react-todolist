import { Tag } from "./../../folders/tags/tag.schema"
import { Folder } from "./../../folders/folder.schema"

export class UserDto {
	readonly username: string
	readonly password: string
	folders: Folder[]
	tags: Tag[]
}
