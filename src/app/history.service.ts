import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoItem } from './todolist.service';


export interface History<T> { 
  canUndo: boolean; 
  canRedo: boolean; 
  history: T[]; 
  currentIndex: number; 
  current: T; 
  }   

  let idItem = 0;
  
@Injectable({
  providedIn: 'root'
})


export class HistoryService<T> {

  private subj = new BehaviorSubject<History<string>>({canUndo: false, canRedo: false, history : [], currentIndex: 0, current: ""});
  public observable = this.subj.asObservable();

  constructor() { }

  create(...labels : readonly string[] ) : this {
    const L: string[] = this.subj.value.history
    this.subj.value.canUndo = false
    this.subj.value.canRedo = false
    this.subj.value.history = 
      [...L,
      ...labels.filter( l => l !== '').map(
          label => (label)
        )]
    return this;
  }

  createDone(...labels : readonly string[] ) : this {
    const L: string[] = this.subj.value.history
    this.subj.value.canUndo = true
    this.subj.value.canRedo = true
    this.subj.value.history = 
      [...L,
      ...labels.filter( l => l !== '').map(
          label => (label)
        )]
    return this;
  }

  delete(item : string): this{
    this.subj.value.history.forEach((element,index)=>{
      if(element==item) this.subj.value.history.splice(index,1);
   });
    return this;
  }

  getHistory(): string[]{
    return this.subj.value.history;
  }

  setHistory(items: string[]): void{
    items.forEach( e => {
      this.create(e)
      
    })
  }


}
