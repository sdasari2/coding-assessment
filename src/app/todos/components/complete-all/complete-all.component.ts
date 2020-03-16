import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-complete-all',
  styleUrls: [
    './complete-all.component.scss',
  ],
  templateUrl: './complete-all.component.html',
})
export class CompleteAllComponent {

  @Input() isAllComplete = false;
  @Output() toggleAllComplete: EventEmitter<boolean> = new EventEmitter();

  constructor () { }

  toggleCompleteAll(ev): void {
    this.isAllComplete = !this.isAllComplete;
    this.toggleAllComplete.emit(this.isAllComplete)
  }

}
