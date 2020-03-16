import { initialState, ITodosState, todosReducer } from './todos.reducer';
import { ITodo } from './../interfaces';
import * as TodoActions from './todo.actions';

import { clone } from '@app/lib/utils';

describe('Todos Reducer', () => {
  let state: ITodosState;

  beforeEach(() => {
    state = clone(initialState);
    expect(state).toEqual(initialState);
  });

  describe('Add Todo', () => {
    it('Should add a new Todo', () => {
      const text = 'New todo';
      const todo: ITodo = {
        text,
        completed: false,
        index: 0,
      };

      const newState = todosReducer(state, TodoActions.addTodo({ text }));
      expect(newState.todos).toEqual([todo]);
    });
  });

  describe('Remove Todo', () => {
    it('should remove a Todo', () => {
      const text1 = 'Todo 1';
      const todo1: ITodo = {
        text: text1,
        completed: false,
        index: 0
      };

      let newState: ITodosState;

      newState = todosReducer(state, TodoActions.addTodo({ text: text1 }));
      newState = todosReducer(newState, TodoActions.addTodo({ text: 'Todo 2' }));
      newState = todosReducer(newState, TodoActions.removeTodo({ index: 1 }));
      expect(newState.todos).toEqual([todo1]);
    });
  });

  describe('Edit Todo', () => {
    it('should edit a Todo with text update', () => {
      const text1 = 'Todo 1';
      const text2= 'Todo 2';
      const todo2: ITodo = {
        text: text2,
        completed: false,
        index: 0
      };

      let newState: ITodosState;

      newState = todosReducer(state, TodoActions.addTodo({ text: text1 }));
      newState = todosReducer(newState, TodoActions.updateTodo({ index: 0, text: 'Todo 2' }));
      expect(newState.todos).toEqual([todo2]);
    });

    it('should edit a Todo with completed state', () => {
      const text1 = 'Todo 1';
      const todo1: ITodo = {
        text: text1,
        completed: true,
        index: 0,
      };

      let newState: ITodosState;

      newState = todosReducer(state, TodoActions.addTodo({ text: text1 }));
      newState = todosReducer(newState, TodoActions.toggleCompleted({ index: 0 }));
      expect(newState.todos).toEqual([todo1]);
    });
  });

  describe('Change Filter', () => {
    it('should update filter', () => {
      const updatedFilter = 'Active';
      let newState: ITodosState;

      newState = todosReducer(state, TodoActions.changeFilterMode({ mode: 'Active' }));
      expect(newState.filterMode).toEqual(updatedFilter);
    });
  });

  describe('Change toggleAllCompleted', () => {
    it('should toggle all to complete', () => {
      const text1 = 'Todo 1';
      const text2 = 'Todo 2';
      const finalTodos: ITodo[] = [
        { text: text2, completed: true, index: 1 },
        { text: text1, completed: true, index: 0 },
      ];
      let newState: ITodosState;

      newState = todosReducer(state, TodoActions.addTodo({ text: text1 }));
      newState = todosReducer(newState, TodoActions.addTodo({ text: text2 }));
      newState = todosReducer(newState, TodoActions.toggleCompleted({ index: 0 }));
      newState = todosReducer(newState, TodoActions.toggleAllCompleted());
      expect(newState.todos).toEqual(finalTodos);
    });
  });

  describe('Clear Completed', () => {
    it('should clear all completed todos', () => {
      const text1 = 'Todo 1';
      const text2 = 'Todo 2';
      const todo2: ITodo = {
        text: text2,
        completed: false,
        index: 1,
      };
      let newState: ITodosState;

      newState = todosReducer(state, TodoActions.addTodo({ text: text1 }));
      newState = todosReducer(newState, TodoActions.addTodo({ text: text2 }));
      newState = todosReducer(newState, TodoActions.toggleCompleted({ index: 0 }));
      newState = todosReducer(newState, TodoActions.clearCompleted());
      expect(newState.todos).toEqual([todo2]);
    });
  });
});
