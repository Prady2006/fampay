import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator"

export class GetContentDto{

    @IsOptional()
    @IsInt()
    @Type(()=>Number)
    @IsPositive()
    limit?: number

    @IsOptional()
    @IsInt()
    @Type(()=>Number)
    skip?: number
}