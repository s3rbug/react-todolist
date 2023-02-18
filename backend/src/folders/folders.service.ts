import { ReorderFoldersDto } from "./dto/reorder-folders.dto"
import { AuthRequest } from "./../auth/interfaces/auth-request.interface"
import { ChangeHeadlineDto } from "./dto/change-headline.dto"
import { Folder } from "./folder.schema"
import { Goal } from "./goals/goal.schema"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"

import { User, UserDocument } from "./../users/user.schema"
import { CreateFolderDto } from "./dto/create-folder.dto"
import { UsersService } from "src/users/users.service"
import { InjectModel } from "@nestjs/mongoose"
import mongoose, { Model, MongooseError } from "mongoose"
import * as uuid from "uuid"
import { DeleteFolderDto } from "./dto/delete-folder.dto"

@Injectable()
export class FoldersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async createFolder(user: User, folderData: CreateFolderDto) {
		const userFound = await this.userModel.findOne({ username: user?.username })

		const newFolder = {
			id: uuid.v4(),
			headline: folderData.headline,
			goals: [] as Goal[],
		}
		userFound.folders.push(newFolder)
		if (userFound.currentFolders.includes(null)) {
			const index = userFound.currentFolders.findIndex(
				(currentFolderId) => currentFolderId === null
			)
			userFound.currentFolders[index] = newFolder.id
		}
		await userFound.save()

		return newFolder
	}

	async deleteFolder(user: User, deleteFolderDto: DeleteFolderDto) {
		const { folderId } = deleteFolderDto
		const userFound = await this.userModel.findOne({ username: user.username })
		const hiddenFolders = userFound.folders.filter(
			(folder) => !userFound.currentFolders.includes(folder.id)
		)
		let success = false
		userFound.folders = userFound.folders.filter((folder) => {
			if (folder.id === folderId) {
				success = true
			}
			return folder.id !== folderId
		})
		userFound.currentFolders = userFound.currentFolders.map(
			(currentFolderId) => {
				if (currentFolderId === folderId) {
					return hiddenFolders[0] ? hiddenFolders[0].id : null
				} else {
					return currentFolderId
				}
			}
		)
		await userFound.save()

		if (!success) {
			throw new HttpException("Folder not found", HttpStatus.BAD_REQUEST)
		}
	}

	async changeHeadline(user: User, folderData: ChangeHeadlineDto) {
		const userFound = await this.userModel.findOne({ username: user.username })

		let success = false
		userFound.folders = userFound.folders.map((folder) => {
			if (folder.id === folderData.folderId) {
				success = true
				return { ...folder, headline: folderData.headline }
			} else {
				return { ...folder }
			}
		})

		if (!success) {
			throw new HttpException("Folder not found", HttpStatus.BAD_REQUEST)
		}
		await userFound.save()
	}

	async getAllFolders(user: User) {
		return user.folders
	}

	async getCurrentFolders(user: User) {
		return user.currentFolders
	}

	async reorderCurrentFolders(user: User, reorderData: ReorderFoldersDto) {
		const userFound = await this.userModel.findOne({ username: user.username })
		const { fromFolderId, toFolderId } = reorderData
		const bothShown = userFound.currentFolders.includes(toFolderId)
		userFound.currentFolders = userFound.currentFolders.map(
			(currentFolderId) => {
				if (currentFolderId === fromFolderId) {
					return toFolderId
				} else if (bothShown && currentFolderId === toFolderId) {
					return fromFolderId
				}
				return currentFolderId
			}
		)
		await userFound.save()
	}
}
