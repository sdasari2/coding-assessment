import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FOOTER_ACTIONS } from '@app/todos/constants/footer-actions';
import { FILTER_MODES } from '@app/todos/constants/filter-modes';


@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {

  @Input() todosLeft = 0;
  @Input() hasCompletedItems = false;
  @Output() footerAction: EventEmitter<FOOTER_ACTIONS> = new EventEmitter();

  currentFilter: FILTER_MODES = 'All';

  constructor() { }

  ngOnInit(): void { }

  changeFilter(filter: FILTER_MODES): void {
    this.currentFilter = filter;
    this.footerAction.emit(filter);
  }

  clearCompleted(): void {
    this.footerAction.emit('Clear_Completed');
  }
}
