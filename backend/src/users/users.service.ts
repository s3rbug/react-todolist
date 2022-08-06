import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    async create(userDto: CreateUserDto): Promise<User>{
        const createdUser = new this.userModel(userDto)
        return createdUser.save()
    }

    async getAll(): Promise<User[]>{
        return this.userModel.find()
    }

    async findUserByUsername(username: string): Promise<User | undefined>{
        const userFound = this.userModel.findOne({"username": username})
        if(!userFound){
            throw new HttpException("Invalid user data", HttpStatus.BAD_REQUEST)
        }
        return userFound
    }

    async whoami(user: User){
        const userFound = await this.userModel.findOne({username: user.username})
        if(!userFound){
            throw new HttpException("Invalid user data", HttpStatus.BAD_REQUEST)
        }
        
        const {password, ...userWithoutPassword} = userFound
        
        return userWithoutPassword
        
    }
}