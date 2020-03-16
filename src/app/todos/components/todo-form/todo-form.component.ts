import { AfterViewInit, Component, EventEmitter, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ITodo } from '@app/todos/interfaces';

const PLACEHOLDER = 'What needs to be done';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, AfterViewInit {

  @Input() initialTodoText = '';
  @Input() newTodo = true;
  @Output() formSubmit: EventEmitter<string> = new EventEmitter();

  @ViewChild('todoText') todoTextElem: ElementRef;

  todoForm: FormGroup;
  placeholderText = PLACEHOLDER;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.placeholderText = this.newTodo ? PLACEHOLDER : '';
    this.buildForm();
  }

  ngAfterViewInit() {
    this.todoTextElem.nativeElement.focus();
  }

  submitTodo(): void {
    const todoText = this.todoForm.value.text;
    this.formSubmit.emit(todoText);

    if (this.newTodo) {
      this.todoForm.get('text').setValue('');
    }
  }

  private buildForm(): void {
    this.todoForm = this.formBuilder.group({
      text: this.initialTodoText
    });
  }
}
