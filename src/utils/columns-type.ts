import { ITaskWithFiles } from './task-types';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}
export interface IColumnWithTasks {
  id: string;
  title: string;
  order: number;
  tasks: Array<ITaskWithFiles>;
}
