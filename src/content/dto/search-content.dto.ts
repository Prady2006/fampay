import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator"
import { Type } from "class-transformer"

export class SearchContentDto{
    @IsOptional()
    @IsNotEmpty()
    title: string

    @IsOptional()
    @IsNotEmpty()
    description: string

    @IsOptional()
    @IsInt()
    @Type(()=>Number)
    @IsPositive()
    limit: number

    @IsOptional()
    @IsInt()
    @IsPositive()
    skip: number 
}