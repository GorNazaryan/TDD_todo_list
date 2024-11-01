import { todosFeature } from "./todos.feature";

const {todosReducer} = todosFeature;

const mockStore = {
  todos: [
    {id: 1, title: 'Test', isCompleted: false},
    {id: 2, title: 'Test 2', isCompleted: true},
    {id: 3, title: 'Test 3', isCompleted: false},
  ]
};

const mockTodos = mockStore.todos;

describe('TodosFeature', () => {

  it('should return correct initial state', () => {
    expect(todosReducer(undefined, {type: ''})).toEqual({todos: []});
  });

  it('should add todo to state on createTodo action', () => {
    const action = {type: 'createTodo', payload: 'Test'};
    expect(todosReducer(undefined, action)).toEqual({todos: [{id: 1, title: 'Test', isCompleted: false}]});
  });

  it('should delete todo form state on deleteTodo action', () => {
    const todoIdToDelete = mockTodos[0].id;
    const action = {type: 'deleteTodo', payload: todoIdToDelete};
    const updateTodos = mockTodos.filter((todo) => todo.id !== todoIdToDelete);
    expect(todosReducer(mockStore, action)).toEqual({todos: updateTodos});
  });

  it('should toggle todo isCompleted on toggleMarkAsCompleteTodo action', () => {
    const todoIdToToggle = mockTodos[0].id;
    const action = {type: 'toggleMarkAsCompleteTodo', payload: {id: todoIdToToggle, isCompleted: true}};
    const updatedTodos = mockTodos.map((todo) => {
      if (todo.id === todoIdToToggle) {
        return {...todo, isCompleted: true};
      }
      return todo;
    });
    expect(todosReducer(mockStore, action)).toEqual({todos: updatedTodos});
  });
});
