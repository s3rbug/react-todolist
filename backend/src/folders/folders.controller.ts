import { ChangeHeadlineDto } from './dto/change-headline.dto';
import { FoldersService } from './folders.service';
import { JwtAuthGuard } from './../auth/auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";

import { CreateFolderDto } from "./dto/create-folder.dto";
import { AuthRequest } from './../auth/interfaces/auth-request.interface';
import { ReorderFoldersDto } from './dto/reorder-folders.dto';
import { DeleteFolderDto } from './dto/delete-folder.dto';

@Controller('folders')
export class FoldersController {

    constructor(
        private readonly foldersService: FoldersService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    createFolder(@Req() req: AuthRequest, @Body() folderData: CreateFolderDto){
        return this.foldersService.createFolder(req.user, folderData)
    }

    @UseGuards(JwtAuthGuard)
    @Put('delete')
    deleteFolder(@Req() req: AuthRequest, @Body() deleteFolderDto: DeleteFolderDto){   
        return this.foldersService.deleteFolder(req.user, deleteFolderDto)
    }
    
    @UseGuards(JwtAuthGuard)
    @Put('headline')
    changeHeadline(@Req() req: AuthRequest, @Body() folderData: ChangeHeadlineDto){
        return this.foldersService.changeHeadline(req.user, folderData)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllFolders(@Req() req: AuthRequest){
        return this.foldersService.getAllFolders(req.user)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('currentFolders')
    getCurrentFolders(@Req() req: AuthRequest){
        return this.foldersService.getCurrentFolders(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Put('reorder')
    reorderCurrentFolders(@Req() req: AuthRequest, @Body() reorderData: ReorderFoldersDto){
        return this.foldersService.reorderCurrentFolders(req.user, reorderData)
    }
}