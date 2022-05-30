export enum HttpErrors {
  Success = 204,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
}

export enum modalActionEnum {
  updateTask = 'updateTask',
  deleteTask = 'deleteTask',
  createTask = 'createTask',
  deleteUser = 'deleteUser',
  updateUser = 'updateUser',
  createBoard = 'createBoard',
  noPermission = 'noPermission',
  viewTask = 'viewTask',
  createColumn = 'createColumn',
  deleteColumn = 'deleteColumn',
  updateBoard = 'updateBoard',
  deleteBoard = 'deleteBoard',
  error = 'error',
  unauthorized = 'Unauthorized',
}
