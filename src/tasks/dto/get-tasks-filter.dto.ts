import { TaskStatus } from "../task.module";
import{IsOptional,IsIn,IsNotEmpty}from 'class-validator'

export class  GetTasksFilterDto{
    @IsOptional()
    @IsIn([TaskStatus.DONE,TaskStatus.IN_PROGRESS,TaskStatus.OPEN])
    status:TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search:string;
}

