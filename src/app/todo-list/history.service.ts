import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface History<T> { 
  isDone: boolean
  history: T[]; 
  currentIndex: number; 
  current: any; 
  }   

  
@Injectable({
  providedIn: 'root'
})


export class HistoryService<T> {


  private subj = new BehaviorSubject<History<T>>({isDone: false, history : [], currentIndex: 0, current: ""});
  public observable = this.subj.asObservable();

  constructor() { }

  
  public addhistory(item: T): this {
    this.subj.value.history.push(item)
    return this
  }

  public deleteFromHistory(item: T): this{
    for( var i = 0; i < this.getHistory.length; i++){ 
    
      if ( this.subj.value.history[i] === item) { 
  
          this.subj.value.history.splice(i, 1); 
      }
  
  }
  return this
  }

  public getHistory(): T[]{
    return this.subj.value.history;
  }

  public setHistory(t: T[]) : void{
    this.subj.value.history = t;
  } 

  public setCurrentIndex(index: number): void{
    this.subj.value.currentIndex = index
  }

  public setItem(item:T){
    this.subj.value.current = item
  }



}
