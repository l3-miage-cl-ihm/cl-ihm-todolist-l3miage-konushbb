import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app'
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{
  newTask = '';
  liste: string[] = [];
  title = 'l3m-tpX-todolist-angular-y2022';
  constructor( public auth: AngularFireAuth, firestoreService: AngularFirestore){

  }

  ngOnInit(): void {
  }
  
  login(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
    this.auth.signOut();
  }

}
  

