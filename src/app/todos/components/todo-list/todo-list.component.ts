import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ITodo } from '@app/todos/interfaces';
import { FILTER_MODES } from '@app/todos/constants/filter-modes';

@Component({
  selector: 'app-todos-list',
  styleUrls: ['./todo-list.component.scss'],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent implements OnInit, OnChanges {

  @Input() todos: ITodo[] = [];
  @Input() filter: FILTER_MODES = 'All';

  displayedTodos: ITodo[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.filterTodos();
  }

  private filterTodos(): void {
    switch (this.filter) {
      case 'All':
        this.displayedTodos = this.todos;
        break;
      case 'Active':
        this.displayedTodos = this.todos.filter(t => !t.completed);
        break;
      case 'Completed':
        this.displayedTodos = this.todos.filter(t => t.completed);
        break;
      default:
        this.displayedTodos = this.todos;
        break;
    }
  }
}
