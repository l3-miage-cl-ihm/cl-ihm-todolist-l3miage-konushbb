import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FilterList, TodoItem, TodoList, TodolistService } from './todolist.service';
import { Observable, BehaviorSubject } from 'RxJs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoListComponent implements OnInit {

  liste: string[] = []
  newTask = ""

  readonly todoListObs : Observable<TodoList>;
  
  activeList : Observable<FilterList>;

  constructor(public tds : TodolistService){
    this.todoListObs = tds.observable;
    this.activeList = tds.aObservable
  }

  ngOnInit(): void {

    var t:string[] = JSON.parse(localStorage.getItem('todo') || '[]');
    t.forEach( e =>
      {
        this.create(e)
        console.log(e)
      })
  }

    create(...labels : readonly string[]){
    this.tds.create(...labels)
    console.log(...labels)
    this.liste.push(...labels)
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

    tous() : number{
      return this.tds.subj.value.items.length;
    }

    actifs(): number{
      const L = this.tds.subj.value.items.filter(item => !item.isDone)
      return L.length
    }

    done(item: TodoItem){
      this.delete(item)
      this.tds.createDone(item.label)
    }
}
