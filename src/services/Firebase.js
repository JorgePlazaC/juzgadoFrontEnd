import React from 'react'
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  remove,
} from "firebase/database";

import FirebaseConfig from './FirebaseConfig';

class Firebase {
    constructor() {
        initializeApp(FirebaseConfig)
    }
}


const firebase = new Firebase();
export default firebase;