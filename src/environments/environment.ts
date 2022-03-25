// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { FirebaseApp, FIREBASE_OPTIONS } from "@angular/fire/compat";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAKpT7Rk01ho_aR76PaLmrN_MvTo2fbIkU",
    authDomain: "todolist-2f842.firebaseapp.com",
    projectId: "todolist-2f842",
    storageBucket: "todolist-2f842.appspot.com",
    messagingSenderId: "809228970383",
    appId: "1:809228970383:web:5349fc58a51f932a6203fa",
    measurementId: "G-HQMLLFEMCC"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
