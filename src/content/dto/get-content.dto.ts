import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator"

export class GetContentDto{

    @IsOptional()
    @IsInt()
    @IsPositive()
    limit: number

    @IsOptional()
    @IsInt()
    @IsPositive()
    skip: number
}