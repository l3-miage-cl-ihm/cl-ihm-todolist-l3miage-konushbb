import { Component, OnInit, ChangeDetectionStrategy, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { TodoItem, TodolistService } from '../todo-list/todolist.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {

@Input () data!: TodoItem;
@Output () remove = new EventEmitter<TodoItem>();
@Output () update = new EventEmitter<TodoItem>();

@ViewChild("newTextInput")newTextInput!:ElementRef<HTMLInputElement>;

private _editing: boolean = false;
// get editing (): boolean {return this.editing}
// set editing(e: boolean) {
//   this._editing = e;
//   if (this.editing) {
//   requestAnimationFrame(
//   () => this.newTextInput.nativeElement?.focus()
//     )
//   }
// }

 

constructor(public tds : TodolistService){

}

  ngOnInit(): void {
  }



  destroy(item: TodoItem){
    this.remove.emit(item)
  }

  updateItem(item: TodoItem){
    this.update.emit(item)
  }


  check(item : TodoItem){
    if(!item.isDone){
      item.isDone = true
    }else{
      item.isDone = false
    }
  }

}
