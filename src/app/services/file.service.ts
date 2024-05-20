import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { FileMetaData } from '../models/file-meta-data';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private fireStore : AngularFirestore, private fireStorage : AngularFireStorage) { }

  // save meta data of file to firestore
  saveMetaDataOfFile(fileObj : FileMetaData) {

    const fileMeta = {
      id : '',
      name : fileObj.name,
      url : fileObj.url,
      size : fileObj.size
    }

    fileMeta.id = this.fireStore.createId();

    this.fireStore.collection('/fileupload').add(fileMeta);
    
  }

  // dislpay all files
  getAllFiles() {
    return this.fireStore.collection('/fileupload').snapshotChanges();
  }

  // delete file 
  deleteFile(fileMeta : FileMetaData) {

    this.fireStore.collection('/fileupload').doc(fileMeta.id).delete();
    this.fireStorage.ref('/fileupload/'+fileMeta.name).delete();

  }

}