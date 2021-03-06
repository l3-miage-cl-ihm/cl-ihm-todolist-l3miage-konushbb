import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';


export interface TodoItem {
  readonly label: string;
  readonly isDone: boolean;
  readonly id: number;
}

export interface TodoList {
  readonly label: string;
  items: readonly TodoItem[];
  done : TodoItem[]
}
export interface FilterList{
  items: TodoItem[];
}
let idItem = 0;


@Injectable({
  providedIn: 'root'
})
export class TodolistService {


  public subj = new BehaviorSubject<TodoList>({label: 'To Do List', items: [], done: []});
  readonly observable = this.subj.asObservable();

  constructor() {

    
  }



  createItem(label:string): any {
    const L: TodoList = this.subj.value;
    this.subj.next( {
      ...L,
      items: [
        ...L.items,
        {label, isDone: false, id: idItem++}
      ]
    } );
    var e = this.subj.value.items.concat()
    const record = {"label" : label,
                    "isDone": false,
                    "id" : idItem++}
    return record;
  }

  createDone(label: string): this {
    const L: TodoList = this.subj.value;
    this.subj.next( {
      ...L,
      items: [
        ...L.items,
        {label, isDone: true, id: idItem++}
      ]
    } );
    return this;
  }

  delete(...items: readonly TodoItem[]): this {
    const L = this.subj.value;
    this.subj.next( {
      ...L,
      items: L.items.filter(item => items.indexOf(item) === -1 )
    } );
    return this;
  }

  update(data: Partial<TodoItem>, ...items: readonly TodoItem[]): this {
    if(data.label !== "") {
      const L = this.subj.value;
      this.subj.next( {
        ...L,
        items: L.items.map( item => items.indexOf(item) >= 0 ? {...item, ...data} : item )
      } );
    } else {
      this.delete(...items);
    }
    return this;
  }
}
