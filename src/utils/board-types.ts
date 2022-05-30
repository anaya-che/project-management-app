import { IColumnWithTasks } from './columns-type';

export interface IBoard {
  id: string;
  title: string;
  description: string;
}
export interface IBoardWithColumns {
  id: string;
  title: string;
  description: string;
  columns: Array<IColumnWithTasks>;
}
