export class CreateUserDto {
    readonly username: string;
    readonly password: string;
    readonly currentFolders: Array<string | null>
}