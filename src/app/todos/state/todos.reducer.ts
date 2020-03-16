import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';

import { FILTER_MODES } from './../constants/filter-modes';
import { ITodo } from '../interfaces/ITodo';

import { clone } from '@app/lib/utils';

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: 'All',
  todos: [],
};

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => ({
      ...existingState,
      todos: [{ text, completed: false, index: existingState.todos.length }, ...existingState.todos],
    })),
    on(TodoActions.removeTodo, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      const objIndex = updatedTodos.findIndex((todo => todo.index === index));

      if (objIndex > -1) {
        updatedTodos.splice(objIndex, 1);
      }

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.toggleCompleted, (existingState, { index }) => {
      const clonedState = clone(existingState);
      const objIndex = clonedState.todos.findIndex((todo => todo.index === index));

      if (objIndex > -1) {
        clonedState.todos[objIndex].completed = !clonedState.todos[objIndex].completed;
      }

      return {
        ...existingState,
        todos: clonedState.todos,
      };
    }),
    on(TodoActions.updateTodo, (existingState, { index, text }) => {
      const clonedState = clone(existingState);
      const objIndex = clonedState.todos.findIndex((todo => todo.index === index));

      if (objIndex > -1) {
        clonedState.todos[objIndex].text = text;
      }

      return {
        ...existingState,
        todos: clonedState.todos,
      };
    }),
    on(TodoActions.toggleAllCompleted, (existingState, { }) => {
      const clonedState = clone(existingState);
      const allCompleted = clonedState.todos.filter(e => e.completed).length === clonedState.todos.length;

      clonedState.todos.forEach((todo: ITodo) => {
        todo.completed = !allCompleted;
      });

      return {
        ...existingState,
        todos: clonedState.todos,
      };
    }),
    on(TodoActions.changeFilterMode, (existingState, { mode }) => ({
      ...existingState,
      filterMode: mode,
    })),
    on(TodoActions.clearCompleted, (existingState) => ({
      ...existingState,
      todos: [...existingState.todos.filter(todo => !todo.completed)],
    })),
  )(state, action);
}

export const todos = (state: ITodosState) => {
  if (state && state.todos) {
    return state.todos;
  }
  return [];
};
export const filterMode = (state: ITodosState) => {
  if (state && state.filterMode) {
    return state.filterMode;
  }
  return 'All';
};
