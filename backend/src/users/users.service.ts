import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async create(userDto: CreateUserDto): Promise<User>{
        const createdUser = new this.userModel(userDto)
        return createdUser.save()
    }

    async getAll(): Promise<User[]>{
        return this.userModel.find()
    }

    async findUserByUsername(username: string): Promise<User | undefined>{
        return this.userModel.findOne({"username": username})
    }
}