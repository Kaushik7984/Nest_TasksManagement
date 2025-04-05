import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './dto/task.entity';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  // Get all tasks
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTask(filterDto);
  }

  // Get task by id
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  // Create task
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  // Delete task
  async deleteTask(id: string): Promise<void> {
    const found = await this.tasksRepository.delete(id);
    if (found.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  // Update taskkt
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}

//old code , without db
// private tasks: Task[] = [];
// //Gety all tasks
// getAllTasks(): Task[] {
//   return this.tasks;
// }
// getAllWithFilters(filterDto: GetTasksFilterDto): Task[] {
//   const { status, search } = filterDto;
//   //define aa temporary array to hold the result
//   let tasks = this.getAllTasks();
//   if (status) {
//     tasks = tasks.filter((task) => task.status === status);
//   }
//   if (search) {
//     tasks = tasks.filter((task) => {
//       if (task.title.includes(search) || task.description.includes(search)) {
//         return true;
//       }
//       return false;
//     });
//   }
//   return tasks;
// }

// //Get task by id
// getTaskById(id: string): Task {
//   const found = this.tasks.find((task) => task.id === id);
//   if (!found) {
//     throw new NotFoundException(` Task with "${id}" not found`);
//   }
//   return found;
// }
// //Create task
// createTask(createTaskDto: CreateDto): Task {
//   const { title, description } = createTaskDto;
//   const task: Task = {
//     id: uuid(),
//     title,
//     description,
//     status: TaskStatus.OPEN,
//   };
//   this.tasks.push(task);
//   return task;
// }
// // Delete Task
// deleteTask(id: string): void {
//   const found = this.getTaskById(id);
//   this.tasks = this.tasks.filter((task) => task.id !== found.id);
// }
// // Update task
// updateTask(id: string, status: TaskStatus): Task {
//   const task = this.getTaskById(id);
//   task.status = status;
//   return task;
// }
