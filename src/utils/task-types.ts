export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: { filename: string; fileSize: number }[];
}
export interface ITaskWithFiles {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: Array<FileInterface>;
}
export interface FileInterface {
  filename: string;
  fileSize: number;
}
