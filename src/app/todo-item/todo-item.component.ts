import { Component, OnInit, ChangeDetectionStrategy, Input, Output, ViewChild, EventEmitter, ElementRef, IterableDiffers } from '@angular/core';
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

@Output() _editing = new EventEmitter<Partial<TodoItem>>();

 public editing =  false
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


  updateLabel(label:string){
    this._editing.emit({label})
  }

  isEditing(): void{
    this.editing = !this.editing

  }


}
