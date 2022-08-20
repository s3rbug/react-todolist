import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    async create(userDto: CreateUserDto){   
        try {
            const user = await this.userModel.create(userDto)
            return user
        }
        catch (error) {
            throw new BadRequestException(error.message)
        }
        // const newUser = new this.userModel(userDto)
        // return newUser.save()
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