import { EditTagDto } from './dto/edit-tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from './../../auth/auth.guard';
import { AuthRequest } from 'src/auth/interfaces/auth-request.interface';

@Controller("tags")
export class TagsController {
    constructor(private tagsService: TagsService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllTags(@Req() req: AuthRequest){
        return this.tagsService.getAll(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getTagById(@Req() req: AuthRequest, @Param('id') id: string){
        return this.tagsService.getTagById(req.user, id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createTag(@Req() req: AuthRequest, @Body() tag: CreateTagDto){
        return this.tagsService.createTag(req.user, tag)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    deleteTag(@Req() req: AuthRequest, @Param('id') id: string){
        return this.tagsService.deleteTag(req.user, id)
    }

    @UseGuards(JwtAuthGuard)
    @Put("edit/:id")
    editTag(@Req() req: AuthRequest, @Param('id') id: string, @Body() newTag: EditTagDto){
        return this.tagsService.editTag(req.user, id, newTag)
    }
}