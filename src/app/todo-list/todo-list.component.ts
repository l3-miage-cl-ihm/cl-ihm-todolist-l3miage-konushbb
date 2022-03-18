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

  ngOnInit(): void {

    var t:string[] = JSON.parse(localStorage.getItem('todo') || '[]');
    t.forEach( e =>
      {
        this.create(e)
      })
  }

    create(...labels : readonly string[]){
    this.tds.create(...labels)
    this.liste.push(...labels)
    console.log(...labels)
    console.log(this.newTask)
    console.log(this.liste)
    localStorage.setItem('todo', JSON.stringify(this.liste));
  }
  
    delete(...items : readonly TodoItem[]){
    this.tds.delete(...items);
    let L: string[] = [];
    let i = 0;
    this.tds.subj.forEach(e => {
      e.items.forEach(element => {
        L[i] = element.label;
        i ++;
      });
    })
    this.liste = L;
    localStorage.setItem("todo", JSON.stringify(this.liste));
  }



 



}
