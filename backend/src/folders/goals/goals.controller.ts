import {
	SwapGoalsSameFolderDto,
	SwapGoalDifferentFolders,
} from "./dto/swap-goals.dto"
import { EditGoalDto } from "./dto/edit-goal.dto"
import { GoalsService } from "./goals.service"
import { GetGoalDto } from "./dto/get-goal.dto"
import { CreateGoalDto } from "./dto/create-goal.dto"
import { AuthRequest } from "./../../auth/interfaces/auth-request.interface"
import { JwtAuthGuard } from "./../../auth/auth.guard"
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
} from "@nestjs/common"

@Controller("goals")
export class GoalsController {
	constructor(private goalsService: GoalsService) {}

	@UseGuards(JwtAuthGuard)
	@Get(":folderId")
	async getAllGoals(
		@Req() req: AuthRequest,
		@Param("folderId") folderId: string
	) {
		return this.goalsService.getAllGoals(req.user, folderId)
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getGoalById(@Req() req: AuthRequest, @Body() getGoalDto: GetGoalDto) {
		return this.goalsService.getGoalById(req.user, getGoalDto)
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	async createGoal(@Req() req: AuthRequest, @Body() goalData: CreateGoalDto) {
		return this.goalsService.createGoal(req.user, goalData)
	}

	@UseGuards(JwtAuthGuard)
	@Put("delete")
	async deleteGoal(@Req() req: AuthRequest, @Body() goalData: GetGoalDto) {
		return this.goalsService.deleteGoal(req.user, goalData)
	}

	@UseGuards(JwtAuthGuard)
	@Put("edit")
	async editGoal(@Req() req: AuthRequest, @Body() editGoalData: EditGoalDto) {
		return this.goalsService.editGoal(req.user, editGoalData)
	}

	@UseGuards(JwtAuthGuard)
	@Put("toggle")
	async toggleChecked(@Req() req: AuthRequest, @Body() goalData: GetGoalDto) {
		return this.goalsService.toggleChecked(req.user, goalData)
	}

	@UseGuards(JwtAuthGuard)
	@Put("swap-goals-same-folder")
	async swapGoalsSameFolder(
		@Req() req: AuthRequest,
		@Body() swapData: SwapGoalsSameFolderDto
	) {
		return this.goalsService.swapGoalsSameFolder(req.user, swapData)
	}

	@UseGuards(JwtAuthGuard)
	@Put("swap-goals-different-folders")
	async swapGoalsDifferentFolders(
		@Req() req: AuthRequest,
		@Body() swapData: SwapGoalDifferentFolders
	) {
		return this.goalsService.swapGoalsDifferentFolders(req.user, swapData)
	}
}
