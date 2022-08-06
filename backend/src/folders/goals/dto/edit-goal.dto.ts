export class EditGoalDto {
    readonly folderId: string;
    readonly goalId: string;
    readonly text?: string
    readonly note?: string
    readonly tagId?: string
}