import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'RxJs';
import { TodoItem, TodoList, TodolistService } from './todolist.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//TODO stockage de la liste a faire avec toutes le données : is done etc 
// que le stokage de la liste
export class AppComponent implements OnInit{
  newTask = '';
  liste: string[]= [];
  title = 'l3m-tpX-todolist-angular-y2022';
  readonly todoListObs : Observable<TodoList>;
  constructor(public tds : TodolistService){
    this.todoListObs = tds.observable;
    // tds.observable.forEach( e => {
    //    this.liste.push(e.label)
    //  })
  }

  ngOnInit(): void {
      // localStorage.setItem("todo", JSON.stringify(this.liste));
      this.liste = JSON.parse(localStorage.getItem('todo') || '{}');
      this.liste.forEach(e => {
        this.tds.create(e);
      })
      console.log(this.liste);
  }
  

  create(...labels : readonly string[]){
    this.tds.create(...labels)
    var label = JSON.stringify(labels)
    if(this.liste.indexOf(label) == -1){
      this.liste.push(...labels);
    }
    localStorage.setItem("todo", JSON.stringify(this.liste));
  }


  // delete(...items : readonly TodoItem[]){
  //   this.tds.delete(...items);
  //   var item: string = JSON.stringify(items);
  //   this.liste.forEach((element,index)=>{
  //     if(element==item) delete this.liste[index];
  //  });
  //   localStorage.setItem("todo", JSON.stringify(this.liste));
  // }


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

  // delete(item : string){
  //     this.liste.filter(e => e!=JSON.stringify(item))
  //     localStorage.setItem("todo", JSON.stringify(this.liste));
  //   }

  done(item: TodoItem){
    this.delete(item);
    this.tds.createDone(item.label);

  }
  
}
