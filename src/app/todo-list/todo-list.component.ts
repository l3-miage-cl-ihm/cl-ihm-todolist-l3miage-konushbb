import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FilterList, TodoItem, TodoList, TodolistService } from './todolist.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators'


type FctFilter = (item: TodoItem) => boolean

interface TodoListPlus extends TodoList{
  remaining: number;
  filter: FctFilter
  displayedItems: readonly TodoItem[]
  allIsDone: boolean
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoListComponent implements OnInit {

  readonly fAll: FctFilter = () => true;
  readonly fCompleted : FctFilter = (item) => item.isDone;
  readonly fActive : FctFilter = (item) => !item.isDone;
  private fCurrent = new BehaviorSubject<FctFilter>(this.fAll)

  liste: string[] = []
  newTask = ""
  l:string[] = []
  listeDone: string[] = []
  d:string[] =[]


  readonly todoListObs : Observable<TodoListPlus>;
  

  constructor(public tds : TodolistService){
    this.todoListObs = combineLatest([this.tds.observable, this.fCurrent]).pipe(
      map(([L, f]) => ({
        ...L,
        remaining : L.done.reduce((nb, item) =>item.isDone ? nb : nb++, 0),
        filter: f,
        displayedItems : L.items.filter(f),
        allIsDone : !L.items.find(it => it.isDone)
      }))
    )
    

  }

  ngOnInit(): void {

     this.l = JSON.parse(localStorage.getItem('todo') || '[]');
      this.l.forEach( e =>
        {
          this.createItem(e)
        })
     this.d = JSON.parse(localStorage.getItem('done') || '[]');
     this.d.forEach(e =>{
       this.createItemDone(e)
     })
  }





  createItem(label:string){
    if(label != ""){
      this.tds.createItem(label)
      this.addTodo(label)

    }

  }

  createItemDone(label:string){
    if(label !=""){
      this.tds.createDone(label)
      this.listeDone.push(label)
      localStorage.setItem('done', JSON.stringify(this.listeDone) );
    }
  }
  
    delete(...items : TodoItem[]){
       this.tds.delete(...items);
       items.forEach( item => {
        if(!item.isDone){
          this.deleteFromTodo(item)
          localStorage.setItem('todo', JSON.stringify(this.liste))
          console.log("deleted from todo")
       }
       else{
         this.deleteFromDone(item)
         localStorage.setItem('done', JSON.stringify(this.listeDone))
       }
       })
  }

    addTodo(label:string){
      this.liste.push(label)
      localStorage.setItem("todo", JSON.stringify(this.liste));
    }

    addDone(label:string){
      this.listeDone.push(label)
      localStorage.setItem("done", JSON.stringify(this.listeDone));
    }

    deleteFromTodo(item : TodoItem){
      this.liste.forEach( (e,i) =>{
    
        if ( e == item.label) { 
    
            this.liste.splice(i, 1); 
        }
    
    })
    localStorage.setItem("todo", JSON.stringify(this.liste));
    }

    deleteFromDone(item : TodoItem){
      this.listeDone.forEach( (e,i) =>{
    
        if ( e == item.label) { 
    
            this.listeDone.splice(i, 1); 
        }
    
    })
    localStorage.setItem("done", JSON.stringify(this.listeDone));
    }

    update(item :TodoItem){
      if(!item.isDone){
        this.tds.update({isDone:true}, item)
        this.deleteFromTodo(item)
        this.addDone(item.label);
      }else{
        this.tds.update({isDone:false}, item)
        this.deleteFromDone(item)
        this.addTodo(item.label)
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

    setFilter(f: FctFilter){
      this.fCurrent.next(f)
    }


}
