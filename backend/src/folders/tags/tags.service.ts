import { Tag } from './tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as uuid from "uuid"

import { User, UserDocument } from './../../users/user.schema';
import { EditTagDto } from './dto/edit-tag.dto';

@Injectable()
export class TagsService{
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}
    
    async getAll(user: User) {
        const userFound = await this.userModel.findOne({username: user.username})
        return userFound.tags
    }

    async createTag(user: User, newTagData: CreateTagDto){
        const userFound = await this.userModel.findOne({username: user.username})
        const tagFound = userFound.tags.some(tag => tag.name === newTagData.name)
        if(tagFound){
            throw new HttpException(`Tag with name ${newTagData.name} already exists`, HttpStatus.BAD_REQUEST)
        }
        const newTag = {
            id: uuid.v4(),
            name: newTagData.name,
            color: newTagData.color
        }
        userFound.tags.push(newTag)
        await userFound.save()
        return newTag
    }

    async deleteTag(user: User, idToDelete: string){
        const userFound = await this.userModel.findOne({username: user.username})
        let success: null | Tag = null
        userFound.tags = userFound.tags.filter(tag => {
            if(tag.id === idToDelete){
                success = {...tag}
            }
            return tag.id !== idToDelete
        })
        if(success){
            userFound.folders = userFound.folders.map(folder =>
                ({
                    ...folder,
                    goals: folder.goals.map(folder => {
                        if(folder.tagId === success.id){
                            return {
                                ...folder,
                                tagId: undefined
                            }
                        }
                        else{
                            return {...folder}
                        }
                    })
                })
            )
        }
        else {
            throw new HttpException("Tag not found", HttpStatus.BAD_REQUEST)
        }
        await userFound.save()
    }

    async getTagById(user: User, idToGet: string){
        const userFound = await this.userModel.findOne({username: user.username})
        return userFound.tags.find(tag => tag.id === idToGet)
    }

    async editTag(user: User, tagId: string, newTag: EditTagDto){
        const userFound = await this.userModel.findOne({username: user.username})
        if(newTag.name){
            const tagFound = userFound.tags.find(tag => tag.name === newTag.name)
            if(tagFound){   
                throw new HttpException("", HttpStatus.BAD_REQUEST)
            }
        }
        let success = false
        userFound.tags = userFound.tags.map(tag => {
            if(tag.id === tagId){
                success = true
                return {
                    ...tag,
                    name: newTag.name || tag.name,
                    color: newTag.color || tag.color
                }
            }
            else{
                return {...tag}
            }
        })
        if(!success){
            throw new HttpException("Tag not found", HttpStatus.BAD_REQUEST)
        }
        await userFound.save()
    }
}