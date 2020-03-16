import { Component, Input, OnInit } from '@angular/core';

import { ITodo } from '@app/todos/interfaces';
import { TodosService } from '@app/todos/services/todos.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: ITodo;

  editTodo = false;

  constructor(
    private todosService: TodosService,
  ) { }

  ngOnInit(): void { }

  openEditTodo(): void {
    this.editTodo = true;
  }

  toggleTodoComplete(): void {
    this.todosService.toggleComplete(this.todo.index);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todo.index);
  }

  updateTodo(todoText: string): void {
    this.editTodo = false;
    if (!todoText) {
      this.removeTodo();
      return;
    }
    this.todosService.updateTodo(this.todo.index, todoText);
  }

}
