import { ADD_TODO, TOGGLE_TODO, SET_CURRENT_FILTER } from '../constants';
import { FiltersEnum } from '../types';

// Actions
export interface IAddTodoAction {
  text: string;
  type: ADD_TODO;
}

export interface IToggleTodoAction {
  index: number;
  type: TOGGLE_TODO;
}

export interface ISetCurrentFilterAction {
  filter: FiltersEnum;
  type: SET_CURRENT_FILTER;
}

// 归一
export type TodoAction = IAddTodoAction | IToggleTodoAction;

// Action Creators
export const addTodo = (text: string): IAddTodoAction => ({
  text,
  type: ADD_TODO
});

export const setCurrentFilter = (filter: FiltersEnum): ISetCurrentFilterAction => ({
  filter,
  type: SET_CURRENT_FILTER
});
