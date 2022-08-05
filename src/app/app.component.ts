import { Component } from '@angular/core';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore'

import { Database, set, ref, update, onValue } from '@angular/fire/database';
import { remove } from 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CRUD';
  userId : any
  public data: any = []
  constructor(public firestore: Firestore, private databse : Database){
    this.getData()
    console.log(this.data.length)
  }
  addData(value: any) {
    const dbInstance = collection(this.firestore, 'users');
    addDoc(dbInstance, value)
      .then(() => {
        alert('Data Sent')
      })
      .catch((err) => {
        alert(err.message)
      })

    set(ref(this.databse, 'users/' + this.data.length++),{
      value
    })
  }

  getData() {
    const dbInstance = collection(this.firestore, 'users');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })

      const starCountRef = ref(this.databse, 'users/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
      });
  }

  updateData(id: string) {
    const dataToUpdate = doc(this.firestore, 'users/', id);
    updateDoc(dataToUpdate, {
      name: 'Yash Bhayani',
      email: 'yash@gmail.com',
      password : 'yash@gmail.com'
    })

  /*  update(ref(this.databse, 'users/' + id),{
      email : 'yash@gmail.com',
      name : 'Yash Bhayani',
      password : 'yash@gmail.com'
    })
    */

      .then(() => {
        alert('Data updated');
        this.getData()
      })
      .catch((err) => {
        alert(err.message)
      })



  }

  deleteData(id: string) {
    const dataToDelete = doc(this.firestore, 'users', id);
    deleteDoc(dataToDelete)

    // remove(ref(this.databse, 'users/' + id))

    .then(() => {
      alert('Data Deleted');
      this.getData()
    })
    .catch((err) => {
      alert(err.message)
    })
  }
}
