import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoItem, TodoList, TodolistService } from './todolist.service';
import { Observable } from 'RxJs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  readonly todoListObs : Observable<TodoList>;

  constructor(public tds : TodolistService){
    this.todoListObs = tds.observable;
  }

  ngOnInit(): void {
  }

}
