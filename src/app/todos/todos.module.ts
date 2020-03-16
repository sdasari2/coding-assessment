import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { TodosService } from './services/todos.service';
import { todosReducer } from './state/todos.reducer';

// Components
import { CompleteAllComponent } from './components/complete-all/complete-all.component';
import { TodosListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoFooterComponent } from './components/todo-footer/todo-footer.component';

// Containers
import { TodoContainerComponent } from './containers/todo-container/todo-container.component';
import { TodoItemComponent } from './containers/todo-item/todo-item.component';

const DECLARATIONS = [
  CompleteAllComponent,
  TodosListComponent,
  TodoFormComponent,
  TodoFooterComponent,
  TodoContainerComponent,
  TodoItemComponent,
];

@NgModule({
  declarations: [
    ...DECLARATIONS,
  ],
  exports: [
    ...DECLARATIONS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('todos', todosReducer),
  ],
  providers: [
    TodosService,
  ],
})
export class TodosModule {}
