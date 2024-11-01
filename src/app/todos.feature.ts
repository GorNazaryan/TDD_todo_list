import { createReducer, on } from "@ngrx/store";
import { TodosActions } from "./todos.actions";

export type ToDoState = { 
  todos: {id: number, title: string, isCompleted: boolean}[]
};

export const mainReducer = createReducer<ToDoState>(
  {
    todos: []
  },
  on(TodosActions.createTodo, (state, {payload}) => {
    const newTodo = {id: state.todos.length + 1, title: payload, isCompleted: false};
    return {todos: [...state.todos, newTodo]};
  }),
  on(TodosActions.deleteTodo, (state, {payload}) => {
    const updatedTodos = state.todos.filter((todo) => todo.id !== payload);
    return {todos: updatedTodos};
  }),
  on(TodosActions.toggleMarkAsCompleteTodo, (state, {payload}) => {
    const updatedTodos = state.todos.map((todo) => {
      if (todo.id === payload.id) {
        return {...todo, isCompleted: payload.isCompleted};
      }
      return todo;
    });
    return {todos: updatedTodos};
  }),
);

export const todosFeature = {
  name: 'todos',
  todosReducer: mainReducer,
};
