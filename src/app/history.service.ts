import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


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


  getHistory(): string[]{
    return this.subj.value.history;
  }

  // setHistory(items: string[]): void{
  //   items.forEach( e => {
  //     this.create(e)
      
  //   })
  // }


}
