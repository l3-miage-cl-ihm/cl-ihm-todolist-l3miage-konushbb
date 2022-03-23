import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FilterList, TodoItem, TodoList, TodolistService } from './todolist.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoListComponent implements OnInit {

  liste: string[] = []
  newTask = ""
  l:string[] = []

  readonly todoListObs : Observable<TodoList>;

  constructor(public tds : TodolistService){
    this.todoListObs = tds.observable;
  }

  ngOnInit(): void {
     this.l = JSON.parse(localStorage.getItem('todo') || '[]');
      this.l.forEach( e =>
        {
          this.createItem(e)
        })
  }

  // create(...labels : readonly string[]){
  //     this.tds.create(...labels)
  //     console.log(this.liste + "    la 1er fois")

  //     console.log(this.liste + "   la 2eme fois ")
  //     console.log(this.liste)
  //     console.log(...labels)
  //     localStorage.setItem('todo', JSON.stringify(this.liste));
  // }

  createItem(label:string){
    console.log(this.liste + "    la 1er fois")
    this.tds.createItem(label)
    console.log(this.liste + "   la 2eme fois ")
    this.liste.push(label)
    console.log(this.liste + "   la 3eme fois ")
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
    console.log(this.liste);
    localStorage.setItem("todo", JSON.stringify(this.liste));
  }

    update(item :TodoItem){
      if(!item.isDone){
        this.tds.delete(item);
        this.tds.createDone(item.label);
      }else{
        item.isDone = false;
      }
    }

    tous() : number{
      return this.tds.subj.value.items.length;
    }

    actifs(): number{
      const L = this.tds.subj.value.items.filter(item => !item.isDone)
      return L.length
    }

    completes(): number{
      return this.tds.subj.value.items.filter(item => item.isDone).length;
    }

    supprimeCoches(){
      const L = this.tds.subj.value.items.filter(item => item.isDone)
      this.delete(...L);
    }
}
