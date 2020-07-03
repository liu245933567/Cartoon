export enum FiltersEnum {
  ALL,
  COMPLETED,
  ACTIVE,
}
export interface Todo {
  [key: string]: string;
}
export interface ITodo {
  isCompleted: boolean;
  title: string;
}
export interface IStoreState {
  todos: Todo[];
  currentFilter: FiltersEnum;
}
