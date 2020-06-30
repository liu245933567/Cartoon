import { TodoAction } from '../actions';
import { ADD_TODO, TOGGLE_TODO } from '../constants';
import { ITodo } from '../types';


const todos = (state: ITodo[] = [], action: TodoAction): ITodo[] => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          isCompleted: false,
          title: action.text
        }
      ];
    case TOGGLE_TODO:
      return state.map((todo: ITodo, idx: number): ITodo =>
        idx === action.index ?
          {...todo, isCompleted: !todo.isCompleted} :
          todo
      );
    default:
      return state;
  }
};

export default todos;
