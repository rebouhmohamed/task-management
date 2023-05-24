import { TaskStatus } from "../task.module";

export class  GetTasksFilterDto{
    status:TaskStatus;
    search:string;
}