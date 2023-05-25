import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.module";


export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowStatuses=[
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];
    transform(value:any){
        value=value.toUpperCase();
        
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`)
        }
        

        return value
    }
    private isStatusValid(status:any){
        const idx=this.allowStatuses.indexOf(status);
        return idx !== -1;
    }
}