import { Injectable } from '@angular/core';

interface History<T> { 
  canUndo: boolean; 
  canRedo: boolean; 
  history: T[]; 
  currentIndex: number; 
  current: T; 
  }   
  
@Injectable({
  providedIn: 'root'
})

export class HistoryService<T> {

  

  constructor() { }
}
