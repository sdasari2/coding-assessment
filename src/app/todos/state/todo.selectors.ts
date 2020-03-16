import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FILTER_MODES } from './../constants/filter-modes';
import { ITodo } from '@app/todos/interfaces';
import * as todosState from './todos.reducer';

export const todosSelector = createFeatureSelector<todosState.ITodosState>('todos');

export const allTodos = createSelector(
  todosSelector,
  todosState.todos,
);

export const filterSelector = createFeatureSelector<todosState.ITodosState>('todos');

export const filterMode = createSelector(
  filterSelector,
  todosState.filterMode,
);
