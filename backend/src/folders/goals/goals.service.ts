import { EditGoalDto } from './dto/edit-goal.dto';
import { SwapGoalDifferentFolders, SwapGoalsSameFolderDto } from './dto/swap-goals.dto';
import { Folder } from './../folder.schema';
import { CreateGoalDto } from './dto/create-goal.dto';
import { GetGoalDto } from './dto/get-goal.dto';
import { User, UserDocument } from './../../users/user.schema';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import * as uuid from 'uuid'

@Injectable()
export class GoalsService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    async getAllGoals(user: User, folderId: string){
        const userFound = await this.userModel.findOne({username: user.username})
        return userFound.folders.find(folder => folder.id === folderId)?.goals
    }

    async getGoalById(user: User, getGoalDto: GetGoalDto){
        const userFound = await this.userModel.findOne({username: user.username})
        const folderFound = userFound.folders.find(folder => folder.id === getGoalDto.folderId)
        if(!folderFound){
            throw new HttpException("Wrong folder id", HttpStatus.BAD_REQUEST)
        }
        const goalFound = folderFound.goals.find(goal => goal.id === getGoalDto.goalId)
        if(!goalFound){
            throw new HttpException("Wrong goal id", HttpStatus.BAD_REQUEST)
        }
        return {
            goal: goalFound,
            folderId: getGoalDto.folderId,
            goalId: getGoalDto.goalId
        }
    }

    async createGoal(user: User, createGoalData: CreateGoalDto){
        const userFound = await this.userModel.findOne({username: user.username})
        const newGoal = {
            id: uuid.v4(),
            text: createGoalData.text,
            note: "",
            tagId: "",
            checked: false
        }
        
        userFound.folders = userFound.folders.map(folder => {
            if(folder.id === createGoalData.folderId){
                return {
                    ...folder,
                    goals: [...folder.goals, {...newGoal}]
                }
            }
            else{
                return {...folder}
            }
        })
        await userFound.save()
        return newGoal
    }

    async deleteGoal(user: User, deleteGoalData: GetGoalDto){        
        const userFound = await this.userModel.findOne({username: user.username})
        let success = false
        userFound.folders = userFound.folders.map(folder => {
            if(folder.id === deleteGoalData.folderId){
                return {
                    ...folder,
                    goals: [...folder.goals.filter(goal => {
                        if(goal.id === deleteGoalData.goalId){
                            success = true
                        }
                        return goal.id !== deleteGoalData.goalId
                    })]
                }
            }
            else {
                return { ...folder }
            }
        })
        if(!success){
            throw new HttpException("Goal not found", HttpStatus.BAD_REQUEST)
        }
        await userFound.save()
    }

    async editGoal(user: User, editGoalData: EditGoalDto){
        const userFound = await this.userModel.findOne({username: user.username})
        let success = false
        userFound.folders = userFound.folders.map(folder => {
            if(folder.id === editGoalData.folderId){
                return {
                    ...folder,
                    goals: folder.goals.map(goal => {
                        if(goal.id === editGoalData.goalId){
                            success = true
                            return {
                                ...goal,
                                text: editGoalData.text || goal.text,
                                note: editGoalData.note || goal.note,
                                tagId: editGoalData.tagId || goal.tagId
                            }
                        }
                        else{
                            return {...goal}
                        }
                    })
                }
            }
            else{
                return {...folder}
            }
        })
        if(!success){
            throw new HttpException("Goal not found", HttpStatus.BAD_REQUEST)
        }
        await userFound.save()
    }

    async toggleChecked(user: User, toggleCheckedData: GetGoalDto){
        const userFound = await this.userModel.findOne({username: user.username})
        let success = false
        userFound.folders = userFound.folders = userFound.folders.map(folder => {
            if(folder.id === toggleCheckedData.folderId){
                return {
                    ...folder,
                    goals: [...folder.goals.map(goal => {
                        if(goal.id === toggleCheckedData.goalId){
                            success = true
                            return {
                                ...goal,
                                checked: !goal.checked
                            }
                        }
                        else{
                            return {...goal}
                        }
                    })]
                }
            }
            else {
                return { ...folder }
            }
        })
        if(!success){
            throw new HttpException("Goal not found", HttpStatus.BAD_REQUEST)
        }
        await userFound.save()
    }

    async swapGoalsDifferentFolders(user: User, swapData: SwapGoalDifferentFolders){
        const userFound = await this.userModel.findOne({username: user.username})
        const {fromFolderId, toFolderId, fromGoalIndex, toGoalIndex} = swapData
        const goalsToMove = userFound.folders.find(folder => folder.id === fromFolderId)?.goals
        if(!goalsToMove){
            throw new HttpException("Wrong data", HttpStatus.BAD_REQUEST)    
        }
        userFound.folders = userFound.folders.map(folder => {
            if(folder.id === fromFolderId){
                return {
                    ...folder,
                    goals: [
                        ...folder.goals.slice(0, fromGoalIndex),
                        ...folder.goals.slice(fromGoalIndex + 1, folder.goals.length)
                    ]
                }
            }
            else if(folder.id === toFolderId){
                return {
                    ...folder,
                    goals: [
                        ...folder.goals.slice(0, toGoalIndex),
                        goalsToMove[fromGoalIndex],
                        ...folder.goals.slice(toGoalIndex, goalsToMove.length)
                    ]
                }
            }
            else{
                return {...folder}
            }
        })

        await userFound.save()
    }

    async swapGoalsSameFolder(user: User, swapData: SwapGoalsSameFolderDto){
        const userFound = await this.userModel.findOne({username: user.username})
        const {folderId, fromGoalIndex, toGoalIndex} = swapData
        userFound.folders = userFound.folders.map(folder => {
            if(folder.id === folderId){
                return {
                    ...folder,
                    goals: (
                        toGoalIndex > fromGoalIndex
                        ? [
                            ...folder.goals.slice(0, fromGoalIndex),
                            ...folder.goals.slice(fromGoalIndex + 1, toGoalIndex + 1),
                            folder.goals[fromGoalIndex],
                            ...folder.goals.slice(toGoalIndex + 1, folder.goals.length)
                        ]
                        : [
                            ...folder.goals.slice(0, toGoalIndex),
                            folder.goals[fromGoalIndex],
                            ...folder.goals.slice(toGoalIndex, fromGoalIndex),
                            ...folder.goals.slice(fromGoalIndex + 1, folder.goals.length)
                        ]
                    )
                }
            }
            else{
                return {...folder}
            }
        })
        await userFound.save()
    }
}