import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'RxJs';
import { FormsModule } from '@angular/forms';
import { History, HistoryService } from './history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{
  newTask = '';
  liste: string[] = [];
  title = 'l3m-tpX-todolist-angular-y2022';
  todoList : Observable<History<string>>;
  constructor(public h : HistoryService<string>){
    this.todoList = h.observable;
  }

  ngOnInit(): void {
      var temp:string[] = JSON.parse(localStorage.getItem('todo') || '[]');
      temp.forEach( e =>
        {
          this.create(e)
        })
  }
  

  create(...labels : readonly string[]){
    this.h.create(...labels)
    this.liste.push(...labels)
    console.log(this.liste)
    console.log(...labels)
    localStorage.setItem('todo', JSON.stringify(this.liste));
  }


  delete(item : string){
    this.h.delete(item);
    for( var i = 0; i < this.liste.length; i++){ 
    
      if (this.liste[i] === item) { 
  
          this.liste.splice(i, 1); 
      }
  
  }
    localStorage.setItem('todo', JSON.stringify(this.liste));
  }

  done(item: string){
    this.delete(item);
    this.h.createDone(item);

  }

}


// TODO stockage de la liste a faire avec toutes le données : is done etc 
// que le stokage de la liste
// export class AppComponent implements OnInit{
//   newTask = '';
//   liste: string[]= [];
//   title = 'l3m-tpX-todolist-angular-y2022';
//   readonly todoListObs : Observable<TodoList>;
//   constructor(public tds : TodolistService){
//     this.todoListObs = tds.observable;
//   }

//   ngOnInit(): void {
//       this.liste = JSON.parse(localStorage.getItem('todo') || '{}');
//       this.liste.forEach(e => {
//         this.tds.create(e);
//       })
//       console.log(this.liste);
//   }
  

//   create(...labels : readonly string[]){
//     this.tds.create(...labels)
//     var label = JSON.stringify(labels)
//     this.liste.push(...labels);
//     localStorage.setItem("todo", JSON.stringify(this.liste));
//   }

//   delete(...items : readonly TodoItem[]){
//     this.tds.delete(...items);
//     let L: string[] = [];
//     let i = 0;
//     this.tds.subj.forEach(e => {
//       e.items.forEach(element => {
//         L[i] = element.label;
//         i ++;
//       });
//     })
//     this.liste = L;
//     localStorage.setItem("todo", JSON.stringify(this.liste));
//   }

//   done(item: TodoItem){
//     this.delete(item);
//     this.tds.createDone(item.label);

//   }
  
// }
  

