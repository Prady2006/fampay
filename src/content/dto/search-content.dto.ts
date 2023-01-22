import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator"

export class SearchContentDto{
    @IsOptional()
    @IsNotEmpty()
    title: string

    @IsOptional()
    @IsNotEmpty()
    description: string

    @IsOptional()
    @IsInt()
    @IsPositive()
    limit: number

    @IsOptional()
    @IsInt()
    @IsPositive()
    skip: number 
}