import { ReorderFoldersDto } from './dto/reorder-folders.dto';
import { AuthRequest } from './../auth/interfaces/auth-request.interface';
import { ChangeHeadlineDto } from './dto/change-headline.dto';
import { Folder } from './folder.schema';
import { Goal } from './goals/goal.schema';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { User, UserDocument } from './../users/user.schema';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, MongooseError } from "mongoose";
import * as uuid from 'uuid';


@Injectable()
export class FoldersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    async createFolder(user: User, folderData: CreateFolderDto){
        const userFound = await this.userModel.findOne({username: user?.username})

        const newFolder = {
            id: uuid.v4(),
            headline: folderData.headline,
            goals: [] as Goal[]
        }
        userFound.folders.push(newFolder)
        const indexEmptyCurrentFolder = userFound.currentFolders.indexOf(null)
        if(indexEmptyCurrentFolder){
            userFound.currentFolders[indexEmptyCurrentFolder] = newFolder.id
        } 
        await userFound.save()
    
        return newFolder
    }

    async deleteFolder(user: User, idToDelete: string){        
        const userFound = await this.userModel.findOne({username: user.username})
        const hiddenFolders = userFound.folders.filter(folder => !userFound.currentFolders.includes(folder.id))
        let success = false
        userFound.folders = userFound.folders.filter(folder => {
            if(folder.id === idToDelete){
                success = true
            }
            return folder.id !== idToDelete
        })
        userFound.currentFolders = userFound.currentFolders.map(currentFolderId => {
            if(currentFolderId === idToDelete){
                return hiddenFolders[0] ? hiddenFolders[0].id : null
            }
            else{
                return currentFolderId
            }
        })
        await userFound.save()

        return {
            success,
            deletedId: success ? idToDelete : null
        }
    }

    async changeHeadline(user: User, folderData: ChangeHeadlineDto){
        const userFound = await this.userModel.findOne({username: user.username})

        let success = false
        userFound.folders = userFound.folders.map(folder => {
            if(folder.id === folderData.folderId){
                success = true
                return {...folder, headline: folderData.headline}
            }
            else{
                return {...folder}
            }
        })

        await userFound.save()
        return {
            success,
            id: success ? folderData.folderId : null,
            newHeadline: success ? folderData.headline : null
        }
    }

    async getAllFolders(user: User){
        return user.folders
    }

    async getCurrentFolders(user: User){
        return user.currentFolders
    }

    async reorderCurrentFolders(user: User, reorderData: ReorderFoldersDto){
        const userFound = await this.userModel.findOne({username: user.username})
        const {fromFolderId, toFolderId} = reorderData
        const bothShown = userFound.currentFolders.includes(toFolderId)
        userFound.currentFolders = userFound.currentFolders.map(currentFolderId => {
            if(currentFolderId === fromFolderId){
                return toFolderId
            }
            else if(bothShown && currentFolderId === toFolderId){
                return fromFolderId
            }
            return currentFolderId
        })
        await userFound.save()
        return {
            success: true
        }
    }
}