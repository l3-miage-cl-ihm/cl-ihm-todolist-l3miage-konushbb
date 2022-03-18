import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoItem, TodoList, TodolistService } from './todolist.service';
import { Observable } from 'RxJs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  liste: string[] = []
  newTask = ""

  readonly todoListObs : Observable<TodoList>;

  constructor(public tds : TodolistService){
    this.todoListObs = tds.observable;
  }

    create(...labels : readonly string[]){
    this.tds.create(...labels)
    this.liste.push(...labels);
    localStorage.setItem("todo", JSON.stringify(this.liste));
  }

  ngOnInit(): void {

    this.liste = JSON.parse(localStorage.getItem('todo') || '[]');
      this.liste.forEach(e => {
        this.tds.create(e);
      })
  }

}
