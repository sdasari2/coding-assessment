import { Component, OnDestroy, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FOOTER_ACTIONS } from '@app/todos/constants/footer-actions';
import { FILTER_MODES } from '@app/todos/constants/filter-modes';
import { ITodo } from '@app/todos/interfaces';
import { TodosService } from '@app/todos/services/todos.service';

const FILTERS: FILTER_MODES[] = ['All', 'Active', 'Completed'];

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  multipleTodosExist = false;
  todos: ITodo[];
  isAllComplete = false;
  hasCompletedItems = false;
  todosLeft = 0;
  filter: FILTER_MODES;

  constructor(
    private todosService: TodosService,
  ) { }

  ngOnInit(): void {
    this.todosChange();
    this.filterChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  addTodo(todoText: string): void {
    if (todoText) {
      this.todosService.addTodo(todoText);
    }
  }

  toggleCompleteAll(ev: boolean): void {
    this.todosService.toggleAllCompleted();
  }

  onFooterAction(ev: FOOTER_ACTIONS) {
    if (FILTERS.indexOf((ev as FILTER_MODES)) > -1) {
      this.todosService.changeFilterMode(ev as FILTER_MODES);
    } else if (ev === 'Clear_Completed') {
      this.todosService.clearCompleted();
    }
  }

  private todosChange(): void {
    this.todosService.allTodos$.pipe(takeUntil(this.destroy$)).subscribe(todos => {
      this.todos = todos;
      this.multipleTodosExist = todos && todos.length > 0;
      let allComplete = true;
      let hasCompletedItems = false;
      this.todosLeft = 0;
      todos.forEach((todo) => {
        if (!todo.completed) {
          this.todosLeft++;
          allComplete = false;
        } else {
          hasCompletedItems = true;
        }
      });
      this.hasCompletedItems = hasCompletedItems;
      this.isAllComplete = allComplete;
    });
  }

  private filterChange(): void {
    this.todosService.filterChange$.pipe(takeUntil(this.destroy$)).subscribe((filter: FILTER_MODES) => {
      this.filter = filter;
    });
  }
}
