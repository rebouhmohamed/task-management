import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Deleted } from './exceptions';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = await this.taskRepository.createQueryBuilder('task');
    query.where('task.userId=:userId', { userId: user.id });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Task with Id "${id}" not found`);
    }
    return found;
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    await task.save();
    delete task.user;
    return task;
  }

  async deleteTask(id: number, user: User): Promise<string> {
    const result = await this.taskRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with Id "${id}" not found`);
    } else {
      throw new Deleted();
    }
  }

  async upadteTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
