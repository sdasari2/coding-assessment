import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

// Components
import { CompleteAllComponent } from '../../components/complete-all/complete-all.component';
import { TodosListComponent } from '../../components/todo-list/todo-list.component';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { TodoFooterComponent } from '../../components/todo-footer/todo-footer.component';

// Containers
import { TodoItemComponent } from '../../containers/todo-item/todo-item.component';

import { TodosService } from '@app/todos/services/todos.service';
import { TodoContainerComponent } from './todo-container.component';

describe('TodoContainerComponent', () => {
  let component: TodoContainerComponent;
  let fixture: ComponentFixture<TodoContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoContainerComponent,
        CompleteAllComponent,
        TodosListComponent,
        TodoFormComponent,
        TodoFooterComponent,
        TodoItemComponent,
      ],
      imports: [
        StoreModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [ TodosService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
